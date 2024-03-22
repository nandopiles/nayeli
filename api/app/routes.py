from flask import jsonify
from app import app
from app.models import User


# Define las rutas
@app.route("/people")
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])
