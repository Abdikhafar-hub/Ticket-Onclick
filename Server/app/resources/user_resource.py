from flask import Blueprint, jsonify
from flask_restful import Api, reqparse, Resource
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from ..models import User, Ticket, Event, Payment, db
import jwt

bp = Blueprint("user", __name__)
api = Api(bp)


class UserResource(Resource):
    fields = ["name", "email", "phone", "password", "organizer"]

    def post(self):
        # User registration
        parser = reqparse.RequestParser()
        for field in UserResource.fields:
            parser.add_argument(field, required=True, help=f"{field} cannot be empty")
        data = parser.parse_args()

        hashed_password = generate_password_hash(data.get("password")).decode("utf-8")

        new_user = User(
            name=data.get("name"),
            email=data.get("email"),
            phone=data.get("phone"),
            password_hash=hashed_password,
            organizer=(
                data.get("organizer").lower() == "true"
                if "organizer" in data
                else False
            ),
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            return {
                "message": "Registration successful! You may now log in.",
                "success": "ok",
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400

    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)

        if user:
            return user.to_dict(), 200

        return {"message": "User not found"}, 404

    @jwt_required()
    def patch(self, user_id):
        # Update user details
        if not user_id:
            return {"message": "User ID is required"}, 400

        user = User.query.get_or_404(int(user_id))

        parser = reqparse.RequestParser()
        parser.add_argument("name", type=str, help="Name of the user")
        parser.add_argument("email", type=str, help="Email of the user")
        parser.add_argument("phone", type=str, help="Phone number of the user")
        parser.add_argument("organizer", type=str, help="Organizer status (true/false)")

        data = parser.parse_args()

        for field in ["name", "email", "phone"]:
            if data[field]:
                setattr(user, field, data[field])

        if "organizer" in data and data["organizer"] is not None:
            organizer_value = data["organizer"].lower()
            if organizer_value in ["true", "false"]:
                user.organizer = organizer_value == "true"
            else:
                return {"message": "'organizer' must be either 'true' or 'false'"}, 400

        try:
            db.session.commit()
            return {"message": "User details updated successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {
                "message": f"An error occurred while updating the user: {str(e)}"
            }, 500

    @jwt_required()
    def delete(self, user_id=None):
        # Delete user along with associated data (tickets, events, payments)
        if user_id:
            user = User.query.get_or_404(user_id)
            tickets = Ticket.query.filter_by(user_id=user_id).all()
            events = Event.query.filter_by(organizer_id=user_id).all()
            payments = Payment.query.filter_by(user_id=user_id).all()

            if payments:
                for payment in payments:
                    db.session.delete(payment)
            if tickets:
                for ticket in tickets:
                    db.session.delete(ticket)

            if events:
                for event in events:
                    db.session.delete(event)

            db.session.delete(user)
            db.session.commit()

            return {"message": "User deleted successfully"}, 200

        return {"message": "User ID not provided"}, 400


class LoginResource(Resource):
    def post(self):
        # User login and token generation
        parser = reqparse.RequestParser()
        for field in ["email", "password"]:
            parser.add_argument(field, required=True, help=f"{field} can't be empty")
        data = parser.parse_args()

        user = User.query.filter_by(email=data.get("email")).first()

        if not user:
            return {"message": "User not found"}, 404

        if check_password_hash(user.password_hash, data.get("password")):
            # Create a JWT token with expiration time set
            token = create_access_token(
                identity=str(user.id), expires_delta=timedelta(hours=1)
            )

            return {"user": user.to_dict(), "token": token, "success": "ok"}, 200

        return {"message": "Invalid credentials"}, 401


class getUser (Resource):
    def get(self):
        return [user.to_dict() for user in User.query.all()]

api.add_resource(UserResource, "/user", "/user/register", "/user/<int:user_id>")
api.add_resource(LoginResource, "/user/login")
api.add_resource(getUser,"/users/all")


"""{ "name": "john",
  "email":"Johnso@gmail.com",
  "phone":"00387656789",
  "password":"oiuytr",
  "organizer":"false"
}"""
