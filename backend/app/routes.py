from app import app
from flask import jsonify, abort, request
from flask_restful import Resource
from app.database import db_session
from app.models import Record
from app.service_pandas import get_statistics
from app.service import filter_queries
from app.service_ml import *


@app.route('/', methods=['GET'])
def route_main():
    abort(404)  # Sample error for testing.
    return jsonify({'sample': 1})


@app.route('/statistics', methods=['GET'])
def route_statistics():
    result = dict()
    records_all = Record.query.filter().all()
    result['statistics'] = get_statistics(records_all)
    return jsonify(result)


class Records(Resource):
    """Endpoints for Returning Records.
    For the convenience, get_records will be with a post method because of the 
    large amount of parameters to process. They will be packaged up to a JSON
    object then passed to the endpoint for further processing. Other enpoints
    will operate as normal RESTful.
    """

    def get(self):
        """This is a experimental endpoint."""
        result = dict()
        records = Record.query.filter(Record.y == "yes").all()
        records_all = Record.query.filter().all()
        result['records'] = [record.as_dict() for record in records]
        result['statistics'] = get_statistics(records_all)

        return jsonify(result)

    def post(self):
        result = dict()
        json_data = request.get_json(force=True)
        records = filter_queries(json_data).all()
        result['records'] = [ record.as_dict() for record in records]

        return jsonify(result)


@app.route('/models/logistic-regression', methods=['GET'])
def route_model_logistic_regression():
    return model_logistic_regression()


@app.route('/models/support-vector-machine', methods=['GET'])
def route_model_support_vector_machine():
    return model_support_vector_machine()


@app.route('/models/nearest-neighbors', methods=['GET'])
def route_model_nearest_neighbors():
    return model_nearest_neighbors()


@app.route('/models/decision-trees', methods=['GET'])
def route_model_decision_tree():
    return model_decision_tree()


@app.route('/models/random-forest', methods=['GET'])
def route_model_random_forest():
    return model_random_forest()


@app.route('/models/ada-boost', methods=['GET'])
def route_model_ada_boost():
    return model_ada_boost()


@app.route('/models/neural-network', methods=['GET'])
def route_model_neural_network():
    return model_neural_network()

