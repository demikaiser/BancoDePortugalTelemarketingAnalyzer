from app import app
from flask import make_response, jsonify

@app.errorhandler(404)
def error_not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)




