const { db } = require("../config/database");

const Payment = {
    // Create payment
    create: (paymentData) => {
        const {
            paymentId,
            orderId,
            amount,
            currency,
            status,
            method,
            email,
            contact
        } = paymentData;

        const stmt = db.prepare(`
            INSERT INTO payments (razorpayPaymentId, orderId, amount, method)
            VALUES (?, ?, ?, ?)
        `);

        const result = stmt.run(
            paymentId,
            orderId,
            amount,
            method
        );

        return { id: result.lastInsertRowid, ...paymentData };
    },

    // Find payment by ID
    findById: (id) => {
        const stmt = db.prepare("SELECT * FROM payments WHERE id = ?");
        return stmt.get(id);
    },

    // Get all payments
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM payments ORDER BY createdAt DESC");
        return stmt.all();
    }
};

module.exports = Payment;