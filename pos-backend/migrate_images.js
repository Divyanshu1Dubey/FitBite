const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const sourceDir = 'C:/Users/DIVYANSHU/Desktop/Restaurant_POS_System/Menu';
const destDir = 'C:/Users/DIVYANSHU/Desktop/Restaurant_POS_System/pos-frontend/public/images/menu';

// 1. Ensure dest directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// 2. Map of exact DB dish names to image filenames
const imageMapping = {
    "Chai": "TEA.jpg",
    "Coffee": "coffee.jpg",
    "Cold Coffee": "cold_coffee.jpg",
    "Cold Drink": "cold_drink.jpg",
    "Veg Sandwich": "veg_Sandwich.jpg",
    "Cheese Sandwich": "Cheese_Sandwhich.jpg",
    "Veg Burger": "Veg_Burger.png",
    "Cheese Burger": "Cheese_Burger.jpg",
    "French Fries": "Fries.jpg",
    "Peri Peri Fries": "peri_fries.jpg",
    "Margherita": "marghretta_pizza.jpg",
    "Corn & Cheese": "cheese_corn.jpg",
    "Protein Bread Pizza": "protien bread pizza.jpg",
    "Protein Paneer Sandwich": "paneer_protien_sanwhich.jpeg",
    "Classic Maggi": "clasical maaagie.jpg",
    "Cheese Maggi": "cheese maggie.jpg",
    "Protein Shake": "Protein shake.jpg",
    "Chai + Veg Sandwich": "TEA.jpg", // fallback
    "Coffee + Fries": "coffee.jpg", // fallback
    "Cold Coffee + Cheese Sandwich": "cold+sand.jpg",
    "Protein Sandwich + Cold Coffee": "sond+coldcofie+proeten.jpeg",
    "Fries + Cold Drink": "frie+COld.jpg"
};

// 3. Copy files
console.log("Copying files...");
const files = fs.readdirSync(sourceDir);
for (const file of files) {
    fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
}
console.log("Files copied successfully!");

// 4. Update Database
const dbPath = 'C:/Users/DIVYANSHU/Desktop/Restaurant_POS_System/pos-backend/data/fitbite.db';
const db = new Database(dbPath);

console.log("Adding image column to dishes...");
try {
    db.exec(`ALTER TABLE dishes ADD COLUMN image TEXT DEFAULT NULL`);
    console.log("Column added.");
} catch (e) {
    if (e.message.includes('duplicate column name')) {
        console.log("Column already exists.");
    } else {
        throw e;
    }
}

console.log("Updating items with images...");
const updateStmt = db.prepare(`UPDATE dishes SET image = ? WHERE name = ?`);

let updatedCount = 0;
for (const [dishName, imageName] of Object.entries(imageMapping)) {
    const result = updateStmt.run(imageName, dishName);
    if (result.changes > 0) {
        updatedCount++;
        console.log(`Updated ${dishName} -> ${imageName}`);
    }
}
console.log(`Updated ${updatedCount} dishes in the database.`);

db.close();
