from flask import jsonify, make_response, request, send_from_directory
from app import app, db
from app.models import Product, User, Category


# --- Home ---
@app.route("/")
def index():
    """Loads the template for the Home page"""
    return send_from_directory("templates", "documentation.html")


# --- Users ---
@app.route("/users", methods=["GET"])
def get_users():
    """Gets all the users."""
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@app.route("/user", methods=["POST"])
def get_user():
    """Gets a specific user searched by its email."""
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and password == user.password:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@app.route("/user/signup", methods=["POST"])
def create_user():
    """Inserts a new user with the info given."""
    data = request.json

    required_fields = ["username", "password", "email", "address"]
    if not all(key in data and data[key] for key in required_fields):
        return jsonify({"error": "Missing or empty data for required fields"}), 400

    if User.query.filter(
        (User.email == data["email"]) | (User.username == data["username"])
    ).first():
        return jsonify({"error": "Email or username already exists"}), 400

    new_user = User(
        username=data["username"],
        password=data["password"],
        email=data["email"],
        address=data["address"],
    )

    db.session.add(new_user)
    db.session.commit()

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
def update_user():
    """Updates the info of an existing user."""
    data = request.json
    user_id = data.get("id")

    user = User.query.get(user_id)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)

    # Updates the user fields with the new info
    user.username = data.get("username", user.username)
    user.password = data.get("password", user.password)
    user.email = data.get("email", user.email)
    user.address = data.get("address", user.address)

    db.session.commit()

    return jsonify(user.serialize())


@app.route("/user/<int:user_id>/add_to_cart/<int:product_id>", methods=["PUT"])
def add_to_cart(user_id, product_id):
    """Adds a product to the user's cart."""
    user = User.query.get(user_id)
    if not user:
        return make_response(jsonify({"error": "User not found"}), 404)

    product = Product.query.get(product_id)
    if not product:
        return make_response(jsonify({"error": "Product not found"}), 404)

    user.bag_list.append(product)
    db.session.commit()

    return jsonify(user.serialize())


# --- Products ---
@app.route("/products", methods=["GET"])
def get_products():
    """Gets all the products."""
    products = Product.query.all()
    return jsonify([product.serialize() for product in products])


@app.route("/product", methods=["GET"])
def get_product():
    """Gets a specific product searched by id."""
    product_id = request.args.get("id")

    product = Product.query.get(product_id)

    if product:
        return jsonify(product.serialize())
    else:
        return jsonify({"error": "Product not found"}), 404


@app.route("/product", methods=["POST"])
def create_product():
    """Inserts a new product with the info given."""
    data = request.json

    # Checks if it has all the required fields
    if not all(key in data for key in ["name", "brand", "price"]):
        return jsonify({"error": "Missing data"}), 400

    new_product = Product(name=data["name"], brand=data["brand"], price=data["price"])

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product created", "product_id": new_product.id}), 201


@app.route("/product", methods=["PUT"])
def update_product():
    """Updates the info of an existing product."""
    data = request.json
    product_id = data.get("id")

    product = Product.query.get(product_id)
    if not product:
        return make_response(jsonify({"error": "Product not found"}), 404)

    # Updates the product fields with the new info
    product.name = data.get("name", product.name)
    product.brand = data.get("brand", product.brand)
    product.price = data.get("price", product.price)

    db.session.commit()

    return jsonify(product.serialize())


@app.route("/product", methods=["DELETE"])
def delete_product():
    """Deletes a product."""
    data = request.json
    product_id = data.get("id")

    product = Product.query.get(product_id)

    if product:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted"}), 200
    else:
        return jsonify({"error": "Product not found"}), 404


@app.route("/products/search", methods=["POST"])
def search_products():
    category_id = request.json.get("category_id")
    brand = request.json.get("brand")
    name_contains = request.json.get("name_contains")

    # Obtain all products
    query = Product.query

    if category_id:
        query = query.filter(Product.categories.any(Category.id == category_id))

    if brand:
        query = query.filter(Product.brand.ilike(f"%{brand}%"))

    if name_contains:
        query = query.filter(Product.name.ilike(f"%{name_contains}%"))

    # Obtain all the products that match with the filters
    products = query.all()

    # Parse the Product objects into dictionaries
    products_json = [product.serialize() for product in products]

    return jsonify(products_json)


# --- Category ---
@app.route("/categories", methods=["GET"])
def get_categories():
    """Gets all the categories."""
    categories = Category.query.all()

    return jsonify([category.serialize() for category in categories])
