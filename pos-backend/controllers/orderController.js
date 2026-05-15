const createHttpError = require("http-errors");
const Order = require("../models/orderModel");

const addOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    const order = Order.create(orderData);
    res
      .status(201)
      .json({ success: true, message: "Order created!", data: order });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const order = Order.findById(parseInt(id));
    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = Order.findAll();
    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { status, orderStatus } = req.body;
    const { id } = req.params;

    if (!id || isNaN(id)) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const order = Order.update(parseInt(id), { status: orderStatus || status });

    if (!order) {
      const error = createHttpError(404, "Order not found!");
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder };
