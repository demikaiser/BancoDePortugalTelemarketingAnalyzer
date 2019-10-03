from flask import Flask
from config import Config
from flask_restful import Api

app = Flask(__name__)
api = Api(app)
app.config.from_object(Config)

# Restful APIs
from app import routes, models, errors
api.add_resource(routes.Records, '/records')





