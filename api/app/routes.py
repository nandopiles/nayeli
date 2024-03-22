from flask import jsonify
from . import app  # Importa el objeto app desde el paquete app
from . import db  # Importar db desde el mismo paquete
from .models import User  # Importar User después de inicializar db


@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users_list = [{"username": user.username, "password": user.password} for user in users]
    return jsonify(users_list)
