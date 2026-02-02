const restaurantModel = require("../models/restaurantModel");

const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      food,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      ratingCount,
      code,
      chords,
    } = req.body;
    if (!title || !chords) {
      return res.status(422).send({
        success: false,
        message: "Title and Address are required",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      food,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      ratingCount,
      code,
      chords,
    });
    await newRestaurant.save();

    res.status(200).send({
      success: true,
      message: "Restaurant created successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(422).send({
        success: false,
        message: "Restaurant Id is required",
      });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createRestaurant, getAllRestaurant, getRestaurant };
