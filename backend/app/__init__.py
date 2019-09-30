from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from os.path import dirname, join

app = Flask(__name__)
api = Api(app)
app.config.from_object(Config)

# Database Setting
from app import database
app.config.from_mapping(
    SQLALCHEMY_DATABASE_URI="sqlite:///" + join(dirname(dirname(__file__)), "../dataset/bank.sqlite3"),
)
database.init_app(app)

# Restful APIs
from app import routes, models, errors
api.add_resource(routes.Records, '/records')





