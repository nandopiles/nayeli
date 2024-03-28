from flask import jsonify, make_response, request, send_from_directory
from app import app, db
from app.models import Product, User


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


@app.route("/user", methods=["GET"])
def get_user():
    """Gets a specific user searched by its id."""
    data = request.json
    user_id = data.get("id")

    user = User.query.get(user_id)

    if user:
        return jsonify(user.serialize())
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/user", methods=["POST"])
def create_user():
    """Inserts a new user with the info given."""
    data = request.json

    # Checks if it has all the required camps
    if not all(key in data for key in ["username", "password", "email", "address"]):
        return jsonify({"error": "Missing data"}), 400

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


# --- Products ---
@app.route("/products", methods=["GET"])
def get_products():
    """Gets all the products."""
    products = Product.query.all()
    return jsonify([product.serialize() for product in products])


@app.route("/product", methods=["GET"])
def get_product():
    """Gets a specific product searched by id."""
    data = request.json
    product_id = data.get("id")

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
    """Searches products by name or brand."""
    data = request.json

    if "search_type" not in data or "search_term" not in data:
        return jsonify({"error": "Search type and search term are required."}), 400

    search_type = data["search_type"]
    search_term = data["search_term"]

    if search_type == "name":
        products = Product.query.filter(Product.name.ilike(f"%{search_term}%")).all()
        results = [product.serialize() for product in products]
        return jsonify({"results": results})

    elif search_type == "brand":
        products = Product.query.filter(Product.brand.ilike(f"%{search_term}%")).all()
        results = [product.serialize() for product in products]
        return jsonify({"results": results})

    else:
        return jsonify({"error": "Invalid search type. Use 'name' or 'brand'."}), 400
