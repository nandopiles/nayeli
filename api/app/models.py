from app import db


# Define los modelos
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def serialize(self):
        return {"id": self.id, "username": self.username, "password": self.password}
