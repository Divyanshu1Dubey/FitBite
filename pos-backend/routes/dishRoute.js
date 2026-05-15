const express = require("express");
const { addDish, getDishes, updateDish, deleteDish } = require("../controllers/dishController");

const router = express.Router();

router.post("/", addDish);
router.get("/", getDishes);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

module.exports = router;
