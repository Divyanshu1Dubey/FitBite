const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

// SQLite database file location
const dbPath = path.join(__dirname, "../data/fitbite.db");

// Ensure the database directory exists before opening the file.
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

// Initialize database
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// Initialize tables
const initDB = () => {
    try {
        // Users table
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                phone TEXT NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Orders table
        db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customerName TEXT NOT NULL,
                customerPhone TEXT NOT NULL,
                guests INTEGER NOT NULL,
                status TEXT NOT NULL,
                items TEXT NOT NULL,
                total REAL NOT NULL,
                tax REAL NOT NULL,
                totalWithTax REAL NOT NULL,
                tableId INTEGER,
                paymentMethod TEXT,
                razorpayOrderId TEXT,
                razorpayPaymentId TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (tableId) REFERENCES tables(id)
            )
        `);

        // Tables table
        db.exec(`
            CREATE TABLE IF NOT EXISTS tables (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tableNo INTEGER NOT NULL UNIQUE,
                status TEXT DEFAULT 'Available',
                seats INTEGER NOT NULL,
                currentOrderId INTEGER,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Categories table
        db.exec(`
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                bgColor TEXT NOT NULL,
                icon TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Dishes table
        db.exec(`
            CREATE TABLE IF NOT EXISTS dishes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                categoryId INTEGER NOT NULL,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                category TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (categoryId) REFERENCES categories(id)
            )
        `);

        // Payments table
        db.exec(`
            CREATE TABLE IF NOT EXISTS payments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                orderId INTEGER NOT NULL,
                amount REAL NOT NULL,
                method TEXT NOT NULL,
                razorpayOrderId TEXT,
                razorpayPaymentId TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (orderId) REFERENCES orders(id)
            )
        `);

        const ensureTable = db.prepare("SELECT 1 FROM tables WHERE tableNo = ? LIMIT 1");
        const insertTable = db.prepare("INSERT INTO tables (tableNo, seats, status) VALUES (?, ?, ?)");
        const defaultTables = [
            { tableNo: 1, seats: 2, status: "Available" },
            { tableNo: 2, seats: 2, status: "Available" },
            { tableNo: 3, seats: 4, status: "Available" },
            { tableNo: 4, seats: 4, status: "Available" },
            { tableNo: 5, seats: 6, status: "Available" },
            { tableNo: 6, seats: 6, status: "Available" },
        ];
        defaultTables.forEach((row) => {
            if (!ensureTable.get(row.tableNo)) {
                insertTable.run(row.tableNo, row.seats, row.status);
            }
        });

        // Seed Categories and Dishes if empty
        const ensureCategory = db.prepare("SELECT 1 FROM categories LIMIT 1");
        if (!ensureCategory.get()) {
            const insertCategory = db.prepare("INSERT INTO categories (name, bgColor, icon) VALUES (?, ?, ?)");
            const insertDish = db.prepare("INSERT INTO dishes (categoryId, name, price, category) VALUES (?, ?, ?, ?)");
            
            const defaultMenus = [
              { name: "Beverages", bgColor: "#2b3324", icon: "🥤", items: [
                { name: "Chai", price: 10, category: "Hot" },
                { name: "Coffee", price: 20, category: "Hot" },
                { name: "Cold Coffee", price: 49, category: "Cold" },
                { name: "Cold Drink", price: 30, category: "Cold" }
              ]},
              { name: "Sandwich", bgColor: "#2f3824", icon: "🥪", items: [
                { name: "Veg Sandwich", price: 39, category: "Veg" },
                { name: "Cheese Sandwich", price: 59, category: "Veg" }
              ]},
              { name: "Burgers", bgColor: "#273225", icon: "🍔", items: [
                { name: "Veg Burger", price: 39, category: "Veg" },
                { name: "Cheese Burger", price: 59, category: "Veg" }
              ]},
              { name: "Snacks", bgColor: "#3a2f1f", icon: "🍟", items: [
                { name: "French Fries", price: 49, category: "Veg" },
                { name: "Peri Peri Fries", price: 79, category: "Veg" }
              ]},
              { name: "Pizza", bgColor: "#2a2f3a", icon: "🍕", items: [
                { name: "Margherita", price: 99, category: "Veg" },
                { name: "Corn & Cheese", price: 119, category: "Veg" }
              ]},
              { name: "High Protein", bgColor: "#1f3a2d", icon: "💪", items: [
                { name: "Protein Bread Pizza", price: 40, category: "Protein" },
                { name: "Protein Paneer Sandwich", price: 59, category: "Protein" }
              ]},
              { name: "Maggi", bgColor: "#3a3220", icon: "🍜", items: [
                { name: "Classic Maggi", price: 40, category: "Veg" },
                { name: "Cheese Maggi", price: 59, category: "Veg" }
              ]},
              { name: "Protein Shake", bgColor: "#1a2e1a", icon: "🥛", items: [
                { name: "Protein Shake", price: 59, category: "Protein" }
              ]},
              { name: "Combos", bgColor: "#2d2b1f", icon: "🔥", items: [
                { name: "Chai + Veg Sandwich", price: 55, category: "Combo" },
                { name: "Coffee + Fries", price: 70, category: "Combo" },
                { name: "Cold Coffee + Cheese Sandwich", price: 120, category: "Combo" },
                { name: "Protein Sandwich + Cold Coffee", price: 120, category: "Combo" },
                { name: "Fries + Cold Drink", price: 80, category: "Combo" }
              ]}
            ];

            defaultMenus.forEach(menu => {
                const info = insertCategory.run(menu.name, menu.bgColor, menu.icon);
                const catId = info.lastInsertRowid;
                menu.items.forEach(dish => {
                    insertDish.run(catId, dish.name, dish.price, dish.category);
                });
            });
        }

        const ensureUser = db.prepare("SELECT 1 FROM users WHERE email = ? LIMIT 1");
        if (!ensureUser.get("admin@fitbite.local")) {
            const password = bcrypt.hashSync("admin123", 10);
            db.prepare(`
                INSERT INTO users (name, email, phone, password, role)
                VALUES (?, ?, ?, ?, ?)
            `).run("Admin", "admin@fitbite.local", "9999999999", password, "admin");
        }

        console.log(`✅ SQLite Database Connected: ${dbPath}`);
        return db;
    } catch (error) {
        console.log(`❌ Database connection failed: ${error.message}`);
        process.exit();
    }
};

module.exports = { db, initDB };