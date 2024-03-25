from pathlib import Path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

# Initiation of Flask app and SQLAlchemy conf
app = Flask(__name__)

# Gets the actual directory of __init__.py file
current_directory = Path(__file__).resolve().parent

# Gets the absolute path of config.json using pathlib
config_file_path = current_directory.parent / "config.json"

Config.load_from_file(config_file_path)
app.config["SQLALCHEMY_DATABASE_URI"] = Config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = Config.SQLALCHEMY_TRACK_MODIFICATIONS

db = SQLAlchemy(app)


from app import routes, models
