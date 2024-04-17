from pathlib import Path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_cors import CORS

# Initiation of Flask app and SQLAlchemy conf
app = Flask(__name__)
# CORS(app, resources={r"/products/*": {"origins": "*"}})
CORS(app, supports_credentials=True)

# Gets the actual directory of __init__.py file
current_directory = Path(__file__).resolve().parent

# Gets the absolute path of config.json using pathlib
config_file_path = current_directory.parent / "config.json"

# Loads the config of the db
Config.load_from_file(config_file_path)
app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = Config.SQLALCHEMY_TRACK_MODIFICATIONS

db = SQLAlchemy(app)


from app import models

# If the tables are not created it'll create them
with app.app_context():
    db.create_all()

from app import routes
