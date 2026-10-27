const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Recipe title is required'],
      trim: true,
      minlength: [2, 'Recipe title must be at least 2 characters long'],
      maxlength: [120, 'Recipe title cannot exceed 120 characters']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: {
        values: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'],
        message: '{VALUE} is not a supported category'
      }
    },
    ingredients: {
      type: [String],
      required: [true, 'At least one ingredient is required'],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0 && val.some(item => item.trim().length > 0);
        },
        message: 'Please provide at least one valid ingredient'
      }
    },
    instructions: {
      type: String,
      required: [true, 'Preparation steps are required'],
      trim: true,
      minlength: [5, 'Preparation steps must be detailed (at least 5 characters)']
    },
    cookingTime: {
      type: Number,
      required: [true, 'Cooking time is required'],
      min: [1, 'Cooking time must be a positive number (minimum 1 minute)']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
