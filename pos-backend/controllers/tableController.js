const Table = require("../models/tableModel");
const createHttpError = require("http-errors");

const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;
    if (!tableNo) {
      const error = createHttpError(400, "Please provide table No!");
      return next(error);
    }
    const isTablePresent = Table.findByNumber(tableNo);

    if (isTablePresent) {
      const error = createHttpError(400, "Table already exist!");
      return next(error);
    }

    const newTable = Table.create({ tableNo, seats });
    res
      .status(201)
      .json({ success: true, message: "Table added!", data: newTable });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = Table.findAll();
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, currentOrderId, orderId } = req.body;
    const { id } = req.params;

    if(!id || isNaN(id)){
        const error = createHttpError(404, "Invalid id!");
        return next(error);
    }

    const table = Table.update(parseInt(id), { status, currentOrderId: currentOrderId || orderId });

    if (!table) {
      const error = createHttpError(404, "Table not found!");
      return next(error);
    }

    res.status(200).json({success: true, message: "Table updated!", data: table});

  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };
