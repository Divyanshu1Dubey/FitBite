const { db } = require("../config/database");

const Category = {
    create: (data) => {
        const stmt = db.prepare(`
            INSERT INTO categories (name, bgColor, icon)
            VALUES (?, ?, ?)
        `);
        const result = stmt.run(data.name, data.bgColor, data.icon);
        return Category.findById(result.lastInsertRowid);
    },

    findById: (id) => {
        const stmt = db.prepare("SELECT * FROM categories WHERE id = ?");
        return stmt.get(id);
    },

    findAll: () => {
        const stmt = db.prepare("SELECT * FROM categories ORDER BY id ASC");
        return stmt.all();
    }
};

module.exports = Category;
