const mongoose = require("mongoose");

const ingredients = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: String,
  },
});

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    deafult: false,
  },
  ingredients: [ingredients],
  num_sales: {
    type: Number,
    default: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
