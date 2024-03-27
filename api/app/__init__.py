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


from app import models

# Crea las tablas en la base de datos
with app.app_context():
    db.create_all()

# Importa las rutas después de haber inicializado la base de datos
from app import routes
