from flask import Blueprint
from flask_restful import Api, reqparse, Resource
from ..models import Payment, db

bp = Blueprint("payment", __name__)
api = Api(bp)


class PaymentResource(Resource):
    fields = ["event_id", "user_id", "amount", "date", "time"]

    def post(self):
        parser = reqparse.RequestParser()
        for field in PaymentResource.fields:
            parser.add_argument(field, required=True, help=f"{field} cannot be empty")
        data = parser.parse_args()

        new_payment = Payment(
            event_id=data.get("event_id"),
            user_id=data.get("user_id"),
            amount=data.get("amount"),
            date=data.get("date"),
            time=data.get("time"),
        )

        db.session.add(new_payment)
        db.session.commit()
        return {"message": "Payment added successfully"}, 201

    def get(self, payment_id=None):
        if payment_id is not None:
            payment = Payment.query.get_or_404(payment_id)
            return payment.to_dict()
        return [payment.to_dict() for payment in Payment.query.all()], 200
    
api.add_resource(PaymentResource,"/payment")