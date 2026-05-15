const bcrypt = require("bcrypt");
const { db } = require("../config/database");

const mapUser = (row) => {
    if (!row) return null;
    const user = {
        id: row.id,
        _id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        role: row.role,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };

    if (row.password) {
        user.password = row.password;
    }

    return user;
};

const User = {
    // Create user
    create: async (userData) => {
        const { name, email, phone, password, role } = userData;
        
        // Validate email
        if (!/\S+@\S+\.\S+/.test(email)) {
            throw new Error("Email must be in valid format!");
        }

        // Validate phone
        if (!/\d{10}/.test(phone)) {
            throw new Error("Phone number must be a 10-digit number!");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const stmt = db.prepare(`
                INSERT INTO users (name, email, phone, password, role)
                VALUES (?, ?, ?, ?, ?)
            `);
            const result = stmt.run(name, email, phone, hashedPassword, role);
            return { id: result.lastInsertRowid, _id: result.lastInsertRowid, name, email, phone, role };
        } catch (error) {
            if (error.message.includes("UNIQUE")) {
                throw new Error("Email already exists!");
            }
            throw error;
        }
    },

    // Find user by email
    findByEmail: (email) => {
        const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
        return mapUser(stmt.get(email));
    },

    // Find user by ID
    findById: (id) => {
        const stmt = db.prepare("SELECT id, name, email, phone, role FROM users WHERE id = ?");
        return mapUser(stmt.get(id));
    },

    // Get all users
    findAll: () => {
        const stmt = db.prepare("SELECT id, name, email, phone, role FROM users");
        return stmt.all().map(mapUser);
    },

    // Compare password
    comparePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    }
};

module.exports = User;