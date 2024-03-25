import json


class Config:
    @classmethod  # can be invoked in the class itself instead of in an instance of the class
    def load_from_file(cls, filename):
        with open(filename) as config_file:
            config = json.load(config_file)
        cls.SQLALCHEMY_DATABASE_URI = config.get("SQLALCHEMY_DATABASE_URI")
        cls.SQLALCHEMY_TRACK_MODIFICATIONS = config.get(
            "SQLALCHEMY_TRACK_MODIFICATIONS", False
        )
