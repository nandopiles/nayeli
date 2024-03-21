from flask import Flask
from app.routes import get_users

app = Flask(__name__)

@app.route("/users", methods=["GET"])
def users_route():
    return get_users()

if __name__ == "__main__":
    app.run(debug=True)

