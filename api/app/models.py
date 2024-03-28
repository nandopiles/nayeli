from app import db


# Intermediate table between User and Product for the favorites list and the shopping cart
user_product = db.Table(
    "user_product",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey("product.id"), primary_key=True),
)

# Intermediate table between Product and Category
product_category = db.Table(
    "product_category",
    db.Column("product_id", db.Integer, db.ForeignKey("product.id"), primary_key=True),
    db.Column(
        "category_id", db.Integer, db.ForeignKey("category.id"), primary_key=True
    ),
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    address = db.Column(db.String(200), nullable=False)
    favs_list = db.relationship(
        "Product",
        secondary=user_product,
        backref=db.backref("favorited_by", lazy="dynamic"),
    )
    bag_list = db.relationship(
        "Product",
        secondary=user_product,
        backref=db.backref("added_to_bag_by", lazy="dynamic"),
    )

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "address": self.address,
            "favs_list": [product.serialize() for product in self.favs_list],
            "bag_list": [product.serialize() for product in self.bag_list],
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    categories = db.relationship(
        "Category",
        secondary=product_category,
        backref=db.backref("products", lazy="dynamic"),
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "brand": self.brand,
            "price": self.price,
            "categories": [category.serialize() for category in self.categories],
        }


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
