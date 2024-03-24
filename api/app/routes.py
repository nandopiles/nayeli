from flask import jsonify, request, send_from_directory
from app import app, db
from app.models import User


@app.route("/")
def index():
    """Loads the template for the Home page"""
    return send_from_directory("templates", "documentation.html")


@app.route("/users", methods=["GET"])
def get_users():
    """Gets all the users"""
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@app.route("/user", methods=["GET"])
def get_user():
    """Gets a specific user"""
    data = request.json
    user_id = data.get("id")

    user = User.query.get(user_id)

    if user:
        return jsonify(user.serialize())
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/user", methods=["POST"])
def create_user():
    """Inserts a new user"""
    data = request.json

    new_user = User(username=data["username"], password=data["password"])

    db.session.add(new_user)
    db.session.commit()

    return (
        jsonify({"message": "User created", "user_id": new_user.id}),
        201,
    )


@app.route("/user", methods=["DELETE"])
def delete_user():
    """Deletes an user"""
    data = request.json
    user_id = data.get("id")

    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
