const createHttpError = require("http-errors");
const Dish = require("../models/dishModel");

const addDish = async (req, res, next) => {
    try {
        const { categoryId, name, price, category } = req.body;
        if (!categoryId || !name || price === undefined) {
            throw createHttpError(400, "Category ID, name, and price are required!");
        }
        const dish = Dish.create({ categoryId, name, price, category: category || "General" });
        res.status(201).json({ success: true, message: "Dish added!", data: dish });
    } catch (error) {
        next(error);
    }
};

const getDishes = async (req, res, next) => {
    try {
        const dishes = Dish.findAll();
        res.status(200).json({ success: true, data: dishes });
    } catch (error) {
        next(error);
    }
};

const updateDish = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            throw createHttpError(400, "Invalid dish ID!");
        }
        const dish = Dish.update(parseInt(id), req.body);
        if (!dish) {
            throw createHttpError(404, "Dish not found!");
        }
        res.status(200).json({ success: true, message: "Dish updated!", data: dish });
    } catch (error) {
        next(error);
    }
};

const deleteDish = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            throw createHttpError(400, "Invalid dish ID!");
        }
        Dish.delete(parseInt(id));
        res.status(200).json({ success: true, message: "Dish deleted!" });
    } catch (error) {
        next(error);
    }
};

module.exports = { addDish, getDishes, updateDish, deleteDish };
