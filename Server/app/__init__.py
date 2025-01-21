from flask import Flask
from flask_jwt_extended import JWTManager
from .resources import event_resource, user_resource, payment_resource, ticket_resource
from flask_migrate import Migrate
from flask_cors import CORS
from .models import db
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_cors import CORS

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "postgresql://ticket_onclick_user:MUHeicTFp5mQYJ2qcFkwjE11qPIidwEK@dpg-cste9dtds78s73ci56fg-a.oregon-postgres.render.com/ticket_onclick"
    )
    app.config["JWT_SECRET_KEY"] = "fgh9876sdfghoiuytsdfgvoiutyrfg"
    app.config["SECRET_KEY"] = "tfyv76fyyu6r7fty8f6tv7ftuv78gyuh"

    CORS(app)

    jwt = JWTManager(app)

    app.register_blueprint(event_resource.bp)
    app.register_blueprint(user_resource.bp)
    app.register_blueprint(payment_resource.bp)
    app.register_blueprint(ticket_resource.bp)

    db.init_app(app)
    migrate = Migrate(app, db)

    return app
