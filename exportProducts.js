const mongoose = require("mongoose");
const fs = require("fs");

const MONGODB_URI = "mongodb+srv://aliusmanijaz143:aliusmanijaz143@cluster0.ajumkky.mongodb.net";

async function exportData() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "your-database-name",
    });

    console.log("✅ Connected to your-database-name");

    const products = await mongoose.connection
      .collection("products")
      .find({})
      .toArray();

    fs.writeFileSync(
      "products.json",
      JSON.stringify(products, null, 2)
    );

    console.log("✅ Products exported successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

exportData();