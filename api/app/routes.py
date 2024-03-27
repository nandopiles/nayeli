from flask import jsonify, make_response, request, send_from_directory
from app import app, db
from app.models import User


# Home
@app.route("/")
def index():
    """Loads the template for the Home page"""
    return send_from_directory("templates", "documentation.html")


# Users
@app.route("/users", methods=["GET"])
def get_users():
    """Gets all the users."""
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@app.route("/user", methods=["GET"])
def get_user():
    """Gets a specific user."""
    data = request.json
    user_id = data.get("id")

    user = User.query.get(user_id)

    if user:
        return jsonify(user.serialize())
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/user", methods=["POST"])
def create_user():
    """Inserts a new user with the info given."""
    data = request.json

    # Comprobamos que se proporcionen los datos necesarios
    if not all(key in data for key in ["username", "password", "email", "address"]):
        return jsonify({"error": "Missing data"}), 400

    # Creamos un nuevo usuario con los datos proporcionados
    new_user = User(
        username=data["username"],
        password=data["password"],
        email=data["email"],
        address=data["address"],
    )

    # Añadimos el usuario a la sesión y guardamos los cambios en la base de datos
    db.session.add(new_user)
    db.session.commit()

    # Devolvemos una respuesta con el ID del usuario creado
    return jsonify({"message": "User created", "user_id": new_user.id}), 201


@app.route("/user", methods=["DELETE"])
def delete_user():
    """Deletes an user."""
    data = request.json
    user_id = data.get("id")

    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/user", methods=["PUT"])
def update_client():
    """Updates the info of an existing user."""
    data = request.json
    user_id = data.get("id")

    user = User.query.get(user_id)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)

    user.username = data.get("username", user.username)
    user.password = data.get("password", user.password)

    db.session.commit()

    return jsonify(user.serialize())
