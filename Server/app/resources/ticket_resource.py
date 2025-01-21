from flask import Blueprint
from flask_restful import Api, reqparse, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from ..models import Ticket, db

bp = Blueprint("ticket", __name__)
api = Api(bp)


class TicketResource(Resource):
    fields = ["user_id", "event_id", "type", "cost"]

    def post(self):
        parser = reqparse.RequestParser()
        for field in TicketResource.fields:
            parser.add_argument(field, help=f"{field} cannot be empty")
        data = parser.parse_args()

        new_ticket = Ticket(
            user_id=data.get("user_id"),
            event_id=data.get("event_id"),
            type=data["type"],
            cost=data["cost"],
        )

        db.session.add(new_ticket)
        db.session.commit()
        return {"message": "Ticket added successfully"}, 201
    
    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())

        tickets = Ticket.query.filter_by(user_id=current_user_id).all()

        if not tickets:
            return {"message": "No tickets found for the current user."}, 404

        return [ticket.to_dict() for ticket in tickets], 200

    # def get(self, ticket_id=None):
    #     if ticket_id:
    #         ticket = Ticket.query.get_or_404(ticket_id)
    #         return ticket.to_dict()
    #     return [ticket.to_dict() for ticket in Ticket.query.all()], 200

    def patch(self, ticket_id):
        if ticket_id:
            ticket = Ticket.query.get_or_404(ticket_id)
            parser = reqparse.RequestParser()
            for field in TicketResource.fields:
                parser.add_argument(field, help=f"{field} is missing")
            data = parser.parse_args()

            for field in TicketResource.fields:
                if data[field]:
                    setattr(ticket, field, data[field])

            db.session.commit()
            return {"message": "Ticket updated successfully"}, 200

    def delete(self, ticket_id):
        if ticket_id:
            ticket = Ticket.query.get_or_404(ticket_id)
            db.session.delete(ticket)
            db.session.commit()
            return {"message": "Ticket deleted successfully"}, 200


api.add_resource(TicketResource, "/ticket", "/ticket/<int:ticket_id>")

"""{
  "user_id":"1",
  "event_id":"2"
}"""
