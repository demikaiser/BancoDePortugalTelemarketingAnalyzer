from app import app_main
from flask import make_response, jsonify


@app_main.errorhandler(404)
def error_not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)




