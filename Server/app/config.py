import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
