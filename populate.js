require("dotenv").config();

const connectDB = require("./Database/connect");
const product = require("./Models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await product.deleteMany();
    await product.create(jsonProducts);
    console.log("success!!!!");
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};
start();
