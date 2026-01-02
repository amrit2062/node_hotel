const MenuItem = require("../models/MenuItem");

exports.createMenu = async (req, res) => {
  try {
    const data = req.body;

    //  Map wrong keys to correct keys
    if (data.ingreidients) {
      data.ingredients = data.ingreidients;
      delete data.ingreidients;
    }

    if (data.numof_sales) {
      data.num_sales = data.numof_sales;
      delete data.numof_sales;
    }

    const newMenu = new MenuItem(data);
    const response = await newMenu.save();

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const data = await MenuItem.find().limit(2);
    console.log(data);
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getmenuTaste = async (req, res) => {
  try {
    const tasted = req.params.taste; // extract the taste type url parameter

    if (tasted == "sweet" || tasted == "spicy" || tasted == "sour") {
      const response = await MenuItem.find({ taste: tasted }).limit(1);
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "invalid taste " });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal server  error " });
  }
};
exports.deletedMenutaste = async (req, res) => {
  try {
    const menuID = req.params.id; // extract the id form url parameters
    // assuming you have a model
    const response = await MenuItem.findByIdAndDelete(menuID);
    if (!response) {
      return res.status(404).json({ error: "menuItems is not found " });
    }
    console.log("menuItems is deleted  ");
    res.status(200).json({ message: "menuItems is deleted sucessfully  " });
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal server error" });
  }
};
