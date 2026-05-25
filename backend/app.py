from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3, os

app = Flask(__name__)
CORS(app)
DB = "pos.db"

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

# ── PRODUCTS ──────────────────────────────────────────
@app.route('/api/products', methods=['GET'])
def get_products():
    db = get_db()
    products = db.execute("SELECT * FROM products").fetchall()
    return jsonify([dict(p) for p in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    db = get_db()
    db.execute(
        "INSERT INTO products (name, sku, price, category) VALUES (?,?,?,?)",
        (data['name'], data['sku'], data['price'], data.get('category',''))
    )
    db.commit()
    return jsonify({"message": "Product added"}), 201

# ── INVENTORY ─────────────────────────────────────────
@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    db = get_db()
    rows = db.execute("""
        SELECT p.name, p.sku, i.channel, i.quantity
        FROM inventory i JOIN products p ON i.product_id = p.id
    """).fetchall()
    return jsonify([dict(r) for r in rows])

@app.route('/api/inventory/update', methods=['POST'])
def update_inventory():
    data = request.json   # {product_id, channel, quantity}
    db = get_db()
    existing = db.execute(
        "SELECT id FROM inventory WHERE product_id=? AND channel=?",
        (data['product_id'], data['channel'])
    ).fetchone()
    if existing:
        db.execute(
            "UPDATE inventory SET quantity=quantity+? WHERE product_id=? AND channel=?",
            (data['quantity'], data['product_id'], data['channel'])
        )
    else:
        db.execute(
            "INSERT INTO inventory (product_id, channel, quantity) VALUES (?,?,?)",
            (data['product_id'], data['channel'], data['quantity'])
        )
    db.commit()
    return jsonify({"message": "Inventory updated"})

# ── ORDERS ────────────────────────────────────────────
@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json   # {channel, items:[{product_id, quantity, price}]}
    db = get_db()
    total = sum(i['quantity'] * i['price'] for i in data['items'])
    cur = db.execute(
        "INSERT INTO orders (channel, total_amount, status) VALUES (?,?,?)",
        (data['channel'], total, 'completed')
    )
    order_id = cur.lastrowid
    for item in data['items']:
        db.execute(
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)",
            (order_id, item['product_id'], item['quantity'], item['price'])
        )
        # Deduct inventory
        db.execute(
            "UPDATE inventory SET quantity=quantity-? WHERE product_id=? AND channel=?",
            (item['quantity'], item['product_id'], data['channel'])
        )
    db.commit()
    return jsonify({"message": "Order placed", "order_id": order_id}), 201

@app.route('/api/orders', methods=['GET'])
def get_orders():
    db = get_db()
    orders = db.execute("SELECT * FROM orders ORDER BY created_at DESC").fetchall()
    return jsonify([dict(o) for o in orders])

@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    db = get_db()
    total_orders = db.execute("SELECT COUNT(*) as c FROM orders").fetchone()['c']
    revenue = db.execute("SELECT SUM(total_amount) as r FROM orders").fetchone()['r'] or 0
    low_stock = db.execute(
        "SELECT p.name, i.channel, i.quantity FROM inventory i JOIN products p ON i.product_id=p.id WHERE i.quantity < 5"
    ).fetchall()
    return jsonify({
        "total_orders": total_orders,
        "total_revenue": revenue,
        "low_stock_alerts": [dict(r) for r in low_stock]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)