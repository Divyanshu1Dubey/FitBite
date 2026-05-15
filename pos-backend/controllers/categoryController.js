const createHttpError = require("http-errors");
const Category = require("../models/categoryModel");
const Dish = require("../models/dishModel");

const addCategory = async (req, res, next) => {
    try {
        const { name, bgColor, icon } = req.body;
        if (!name || !bgColor || !icon) {
            throw createHttpError(400, "Name, bgColor, and icon are required!");
        }
        const category = Category.create({ name, bgColor, icon });
        res.status(201).json({ success: true, message: "Category added!", data: category });
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = Category.findAll();
        // optionally attach dishes
        const dishes = Dish.findAll();
        
        const categoriesWithItems = categories.map(cat => ({
            ...cat,
            items: dishes.filter(d => d.categoryId === cat.id)
        }));

        res.status(200).json({ success: true, data: categoriesWithItems });
    } catch (error) {
        next(error);
    }
};

module.exports = { addCategory, getCategories };
