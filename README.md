# retail-pos-system
Omnichannel POS and Inventory Management System   --MANTASHA MIRZA;NADEEM JAWED;AHTESHAM KHAN;SOHA BEGUM


# 🛒 Omnichannel POS & Inventory Management System

A real-time Point-of-Sale system syncing inventory across Store, Online & Mobile channels.

## Features
- ✅ Multi-channel sales (Store / Online / Mobile)
- 📦 Real-time inventory tracking & low-stock alerts
- 🧾 Order management with automatic stock deduction
- 📊 Live KPI dashboard (revenue, orders, alerts)
- 🔄 Auto-refresh every 10 seconds

## Tech Stack
| Layer    | Technology       |
|----------|-----------------|
| Backend  | Python + Flask   |
| Database | SQLite           |
| Frontend | HTML/CSS/JS      |
| API      | REST             |

## Quick Start
```bash
pip install flask flask-cors
python backend/app.py
# Open frontend/index.html in browser
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List all products |
| POST | /api/products | Add product |
| GET | /api/inventory | View stock levels |
| POST | /api/inventory/update | Restock items |
| POST | /api/orders | Place an order |
| GET | /api/orders | View recent orders |
| GET | /api/dashboard | KPI summary |