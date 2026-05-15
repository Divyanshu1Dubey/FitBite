const { db } = require("../config/database");

const mapTable = (row) => {
    if (!row) return null;

    let currentOrder = null;
    if (row.currentOrderId) {
        try {
            const Order = require("./orderModel");
            currentOrder = Order.findById(row.currentOrderId);
        } catch {
            currentOrder = null;
        }
    }

    return {
        id: row.id,
        _id: row.id,
        tableNo: row.tableNo,
        status: row.status,
        seats: row.seats,
        currentOrder,
        currentOrderId: row.currentOrderId,
        createdAt: row.createdAt,
    };
};

const Table = {
    // Create table
    create: (tableData) => {
        const { tableNo, seats, status = "Available" } = tableData;

        const stmt = db.prepare(`
            INSERT INTO tables (tableNo, seats, status)
            VALUES (?, ?, ?)
        `);

        const result = stmt.run(tableNo, seats, status);
        return Table.findById(result.lastInsertRowid);
    },

    // Find table by ID
    findById: (id) => {
        const stmt = db.prepare("SELECT * FROM tables WHERE id = ?");
        return mapTable(stmt.get(id));
    },

    // Get all tables
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM tables ORDER BY tableNo ASC");
        return stmt.all().map(mapTable);
    },

    // Update table
    update: (id, updateData) => {
        const fields = [];
        const values = [];

        Object.keys(updateData).forEach(key => {
            if (key === 'orderId' || key === 'currentOrderId') {
                fields.push('currentOrderId = ?');
                values.push(updateData[key]);
            } else {
                fields.push(`${key} = ?`);
                values.push(updateData[key]);
            }
        });

        values.push(id);

        const stmt = db.prepare(`UPDATE tables SET ${fields.join(", ")} WHERE id = ?`);
        stmt.run(...values);

        return Table.findById(id);
    },

    // Find table by number
    findByNumber: (tableNo) => {
        const stmt = db.prepare("SELECT * FROM tables WHERE tableNo = ?");
        return mapTable(stmt.get(tableNo));
    },

    // Get available tables
    getAvailable: () => {
        const stmt = db.prepare("SELECT * FROM tables WHERE status = 'Available' ORDER BY tableNo ASC");
        return stmt.all().map(mapTable);
    }
};

module.exports = Table;