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

module.exports = { createRestaurant };
