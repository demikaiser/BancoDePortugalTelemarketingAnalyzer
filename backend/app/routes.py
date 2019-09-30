from app import app
from flask import jsonify, abort
from flask_restful import Resource




sample = [
    {
        'id': 1,
        'title': 'Title',
        'description': 'Desc'
    }
]



@app.route('/', methods=['GET'])
def route_main():

    abort(404)

    return jsonify({'sample': sample})



class Records(Resource):
    def get(self):
        return {'sample': sample}






