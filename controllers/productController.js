const { deleteFile } = require("../helpers/fileHelper");
const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
  let imagePath = null;
  try {
    const { name, price, description, restaurant, rating } = req.body;
    imagePath = req.file ? req.file.path : null;

    if (!name || !price || !restaurant) {
      deleteFile(imagePath);
      return res.status(422).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const productCode = generateProductCode(name);
    await productModel.create({
      name,
      price,
      image: imagePath,
      code: productCode,
      restaurant,
      description,
      rating,
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

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-__v -createdAt -updatedAt");

    const filteredProducts = products.map((item) => ({
      ...item.toObject(),
      // _id: item._id,
      // name: item.name,
      // price: item.price,
      image: item.image
        ? process.env.BASE_URL + item.image.replace(/\\/g, "/")
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcuWTrty8k4hhQ-HE-Msg0huP8iT3QIplP-w&s",
      // status: item.status,
    }));
    res.status(200).send({
      success: true,
      data: filteredProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateProduct = async (req, res) => {
  let imagePath = null;
  try {
    const { name, price, status } = req.body;
    imagePath = req.file ? req.file.path : null;

    const product = await productModel.findById(req.params.id);
    if (!product) {
      deleteFile(imagePath);
      return res.status(404).send({
        success: "false",
        message: "Product not found",
      });
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (status) product.status = status;

    if (req.file) {
      if (product.image) {
        deleteFile(product.image);
      }

      product.image = imagePath;
    }

    await product.save();

    res.status(200).send({
      success: "true",
      message: "Product Updated Successfully",
    });
  } catch (error) {
    deleteFile(imagePath);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createProduct, getAllProducts, updateProduct };

const generateProductCode = (name) => {
  const codePart = name.substring(0, 3).toUpperCase();
  const random = Math.floor(Math.random() * 1000);
  return `${codePart}-${random}`;
};
