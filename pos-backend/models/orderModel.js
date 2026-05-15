const { db } = require("../config/database");

const parseItems = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    try {
        return JSON.parse(value);
    } catch {
        return [];
    }
};

const mapOrder = (row) => {
    if (!row) return null;

    const tableId = row.tableId ?? null;
    let table = null;

    if (tableId) {
        try {
            const Table = require("./tableModel");
            table = Table.findById(tableId);
        } catch {
            table = null;
        }
    }

    return {
        id: row.id,
        _id: row.id,
        customerDetails: {
            name: row.customerName,
            phone: row.customerPhone,
            guests: row.guests,
        },
        orderStatus: row.status,
        orderDate: row.createdAt,
        bills: {
            total: row.total,
            tax: row.tax,
            totalWithTax: row.totalWithTax,
        },
        items: parseItems(row.items),
        table,
        paymentMethod: row.paymentMethod,
        paymentData: {
            razorpay_order_id: row.razorpayOrderId,
            razorpay_payment_id: row.razorpayPaymentId,
        },
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
};

const normalizeOrderInput = (orderData) => {
    const customerDetails = orderData.customerDetails || {};
    const bills = orderData.bills || {};
    const tableValue = orderData.table ?? orderData.tableId ?? null;
    const tableId = typeof tableValue === "object" ? tableValue.tableId ?? tableValue.id ?? null : tableValue;
    const paymentData = orderData.paymentData || {};

    return {
        customerName: customerDetails.name || orderData.customerName || "",
        customerPhone: customerDetails.phone || orderData.customerPhone || "",
        guests: customerDetails.guests || orderData.guests || 0,
        status: orderData.orderStatus || orderData.status || "In Progress",
        items: orderData.items || [],
        total: bills.total ?? orderData.total ?? 0,
        tax: bills.tax ?? orderData.tax ?? 0,
        totalWithTax: bills.totalWithTax ?? orderData.totalWithTax ?? 0,
        tableId,
        paymentMethod: orderData.paymentMethod || null,
        razorpayOrderId: paymentData.razorpay_order_id || orderData.razorpayOrderId || null,
        razorpayPaymentId: paymentData.razorpay_payment_id || orderData.razorpayPaymentId || null,
    };
};

const Order = {
    // Create order
    create: (orderData) => {
        const normalized = normalizeOrderInput(orderData);

        const stmt = db.prepare(`
            INSERT INTO orders (customerName, customerPhone, guests, status, items, total, tax, totalWithTax, tableId, paymentMethod)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            normalized.customerName,
            normalized.customerPhone,
            normalized.guests,
            normalized.status,
            JSON.stringify(normalized.items),
            normalized.total,
            normalized.tax,
            normalized.totalWithTax,
            normalized.tableId || null,
            normalized.paymentMethod || null
        );

        return Order.findById(result.lastInsertRowid);
    },

    // Find order by ID
    findById: (id) => {
        const stmt = db.prepare("SELECT * FROM orders WHERE id = ?");
        return mapOrder(stmt.get(id));
    },

    // Get all orders
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM orders ORDER BY createdAt DESC");
        return stmt.all().map(mapOrder);
    },

    // Update order
    update: (id, updateData) => {
        const fields = [];
        const values = [];

        Object.keys(updateData).forEach(key => {
            if (key === 'items') {
                fields.push("items = ?");
                values.push(JSON.stringify(updateData[key]));
            } else if (key === 'orderStatus' || key === 'status') {
                fields.push("status = ?");
                values.push(updateData[key]);
            } else {
                fields.push(`${key} = ?`);
                values.push(updateData[key]);
            }
        });

        fields.push("updatedAt = CURRENT_TIMESTAMP");
        values.push(id);

        const stmt = db.prepare(`UPDATE orders SET ${fields.join(", ")} WHERE id = ?`);
        stmt.run(...values);

        return Order.findById(id);
    },

    // Get orders by status
    findByStatus: (status) => {
        const stmt = db.prepare("SELECT * FROM orders WHERE status = ? ORDER BY createdAt DESC");
        return stmt.all(status).map(mapOrder);
    }
};

module.exports = Order;