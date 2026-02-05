const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(422).send({
        success: false,
        message: "Category name is required",
      });
    }

    const imagePath = req.file ? req.file.path : null;

    await categoryModel.create({
      name,
      imageUrl: imagePath,
    });

    res.status(200).send({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Something went wrong",
    });
  }
};

module.exports = { createCategory };
