from flask import jsonify
from .models import User


def get_users():
    users = User.query.all()
    users_list = [{"username": user.username, "email": user.email} for user in users]
    return jsonify(users_list)
