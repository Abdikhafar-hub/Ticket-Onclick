from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

db = SQLAlchemy()


class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    time = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=True)
    cost = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String)

    organizer = db.relationship(
        "User", backref=db.backref("organized_events", lazy=True)
    )
    payments = db.relationship("Payment", backref="event", lazy=True)
    tickets = db.relationship("Ticket", backref="event", lazy=True)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    # serialize_rules = ("-organized_events", "-payments.event", "-tickets.event")
    serialize_only = (
        "name",
        "date",
        "time",
        "description",
        "capacity",
        "id",
        "category",
        "cost",
        "location",
    )


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    organizer = db.Column(db.Boolean, default=False)

    events = db.relationship("Event", backref="user", lazy=True)
    payments = db.relationship("Payment", backref="user", lazy=True)
    tickets = db.relationship("Ticket", backref="user", lazy=True)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    serialize_only = ("name", "email", "phone", "id", "organizer")


class Ticket(db.Model, SerializerMixin):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    cost = db.Column(db.Integer)
    type = db.Column(db.String)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    serialize_only = (
        "event.time",
        "event.name",
        "event.date",
        "cost",
        "type",
        "event.location",
    )


class Payment(db.Model, SerializerMixin):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow().date)
    time = db.Column(db.Time, nullable=False, default=datetime.utcnow().time)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    serialize_rules = ("-user.payments", "-event.payments")
