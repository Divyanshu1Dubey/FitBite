const { db } = require("../config/database");

const Dish = {
    create: (data) => {
        const stmt = db.prepare(`
            INSERT INTO dishes (categoryId, name, price, category)
            VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(data.categoryId, data.name, data.price, data.category);
        return Dish.findById(result.lastInsertRowid);
    },

    findById: (id) => {
        const stmt = db.prepare("SELECT * FROM dishes WHERE id = ?");
        return stmt.get(id);
    },

    findByCategoryId: (categoryId) => {
        const stmt = db.prepare("SELECT * FROM dishes WHERE categoryId = ? ORDER BY id ASC");
        return stmt.all(categoryId);
    },

    findAll: () => {
        const stmt = db.prepare("SELECT * FROM dishes ORDER BY id ASC");
        return stmt.all();
    },

    update: (id, data) => {
        const fields = [];
        const values = [];

        if (data.name !== undefined) { fields.push("name = ?"); values.push(data.name); }
        if (data.price !== undefined) { fields.push("price = ?"); values.push(data.price); }
        if (data.category !== undefined) { fields.push("category = ?"); values.push(data.category); }
        if (data.categoryId !== undefined) { fields.push("categoryId = ?"); values.push(data.categoryId); }

        if (fields.length === 0) return Dish.findById(id);

        values.push(id);
        const stmt = db.prepare(`UPDATE dishes SET ${fields.join(", ")} WHERE id = ?`);
        stmt.run(...values);
        return Dish.findById(id);
    },

    delete: (id) => {
        const stmt = db.prepare("DELETE FROM dishes WHERE id = ?");
        return stmt.run(id);
    }
};

module.exports = Dish;
