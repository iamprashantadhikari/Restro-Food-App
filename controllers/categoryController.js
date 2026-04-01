const deleteFile = require("../helpers/fileHelper");
const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!name) {
      // deleteFile(imagePath);
      return res.status(422).send({
        success: false,
        message: "Category name is required",
      });
    }

    await categoryModel.create({
      name,
      imageUrl: imagePath,
    });

    res.status(200).send({
      success: true,
      message: "Category created successfully",
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

const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    const updatedCategories = categories.map((item) => ({
      // ...item.toObject(),
      _id: item.id,
      name: item.name,
      imageUrl: process.env.BASE_URL + item.imageUrl.replace(/\\/g, "/"),
      status: item.status,
    }));

    // This formating I would do in seperate formatter file or service to make it resuable

    res.status(200).send({
      success: true,
      data: updatedCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createCategory, getAllCategory };
