const { deleteFile } = require("../helpers/fileHelper");
const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
  let imagePath = null;
  try {
    const { name, price } = req.body;
    imagePath = req.file ? req.file.path : null;

    if (!name || !price) {
      deleteFile(imagePath);
      return res.status(422).send({
        success: false,
        message: "All Fields are required",
      });
    }

    await productModel.create({
      name,
      price,
      image: imagePath,
    });
    res.status(200).send({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    deleteFile(imagePath);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createProduct };
