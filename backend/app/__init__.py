from flask import Flask
# from config import Config
from flask_restful import Api
from flask_cors import CORS

app_main = Flask(__name__)
CORS(app_main)
api = Api(app_main)
# app.config.from_object(Config)

# Restful APIs
from app import routes, models, errors
api.add_resource(routes.Records, '/records')
