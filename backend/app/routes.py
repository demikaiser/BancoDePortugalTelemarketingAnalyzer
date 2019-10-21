from app import app
from flask import jsonify, abort, request
from flask_restful import Resource
from app.database import db_session
from app.models import Record
from app.service_pandas import get_statistics
from app.service import filter_queries


@app.route('/', methods=['GET'])
def route_main():
    abort(404)
    return jsonify({'sample': 1})


@app.route('/statistics', methods=['GET'])
def route_statistics():
    result = dict()
    records_all =  Record.query.filter().all()
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
        records =  Record.query.filter(Record.y == "yes").all()
        records_all =  Record.query.filter().all()
        result['records'] = [ record.as_dict() for record in records] 
        result['statistics'] = get_statistics(records_all)

        return jsonify(result)


    def post(self):
        result = dict()
        json_data = request.get_json(force=True)
        records = filter_queries(json_data).all()
        result['records'] = [ record.as_dict() for record in records]

        return jsonify(result)

