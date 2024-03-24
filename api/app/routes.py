from flask import jsonify
from app import app
from app.models import User


@app.route("/users", methods=["GET"])
def get_users():
    """Gets all the users from the db"""
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@app.route("/user/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Gets a specific user from the db depending on its id"""
    user = User.query.get(user_id)
    if user:
        return jsonify(user.serialize())
    else:
        return jsonify({"error": "User not found"}), 404
