from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Api, reqparse, Resource
from datetime import datetime
from ..models import Event, db

bp = Blueprint("event", __name__)
api = Api(bp)


class EventResource(Resource):
    fields = [
        "name",
        "category",
        "organizer_id",
        "location",
        "time",
        "date",
        "capacity",
        "description",
        "cost",
    ]

    def post(self):
        parser = reqparse.RequestParser()
        for field in EventResource.fields:
            parser.add_argument(field, required=True, help=f"{field} cannot be empty")
        data = parser.parse_args()

        new_event = Event(
            name=data["name"],
            category=data["category"],
            organizer_id=data["organizer_id"],
            location=data["location"],
            time=data["time"],
            date=data["date"],
            capacity=data["capacity"],
            description=data["description"],
            cost=data["cost"],
        )

        db.session.add(new_event)
        db.session.commit()
        return {"message": "Event added successfully"}, 201

    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())

        events = Event.query.filter_by(organizer_id=current_user_id).all()

        if not events:
            return {"message": "No events found for the current organizer."}, 404

        return [event.to_dict() for event in events], 200

    def patch(self, event_id):
        event = Event.query.get_or_404(event_id)
        parser = reqparse.RequestParser()

        for field in EventResource.fields:
            parser.add_argument(field, required=False, help=f"{field} is missing")

        data = parser.parse_args()

        for field in EventResource.fields:
            if data[field] is not None:
                if field == "time":
                    setattr(
                        event, field, datetime.strptime(data[field], "%H:%M:%S").time()
                    )
                elif field == "date":
                    setattr(
                        event, field, datetime.strptime(data[field], "%Y-%m-%d").date()
                    )
                else:
                    setattr(event, field, data[field])

        db.session.commit()

        return {"message": "Update successful"}, 200

    def delete(self, event_id):
        event = Event.query.get_or_404(event_id)
        db.session.delete(event)
        db.session.commit()
        return {"message": "Event deleted successfully"}, 200


class AllEvents(Resource):
    def get(self):
        events = Event.query.all()
        return [event.to_dict() for event in events], 200


api.add_resource(EventResource, "/event", "/event/<int:event_id>")
api.add_resource(AllEvents, "/event/all")


"""{ "name": "Tech Conference 2044", 
"category": "Conference", 
"organizer_id": 1,
"location": "Convention Center Nairobi",
"time": "14:00:00", 
"date": "2024-12-15", "capacity": 500}"""
