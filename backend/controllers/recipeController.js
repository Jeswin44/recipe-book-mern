const Recipe = require('../models/Recipe');

// @desc    Fetch all saved recipes
// @route   GET /api/recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const { category, search } = req.query;
    let queryFilter = {};

    if (category && category !== 'All') {
      queryFilter.category = category;
    }

    if (search) {
      queryFilter.title = { $regex: search, $options: 'i' };
    }

    const recipes = await Recipe.find(queryFilter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve recipes: ' + err.message
    });
  }
};

// @desc    Fetch single recipe by ID
// @route   GET /api/recipes/:id
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found with the requested ID'
      });
    }

    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid Recipe ID format'
    });
  }
};

// @desc    Create and save a new recipe
// @route   POST /api/recipes
exports.createRecipe = async (req, res) => {
  try {
    const { title, category, ingredients, instructions, cookingTime } = req.body;

    // Strict validation checks
    if (!title || !category || !ingredients || !instructions || cookingTime === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all mandatory fields: Recipe Name, Category, Ingredients, Steps, and Cooking Time.'
      });
    }

    const parsedCookingTime = Number(cookingTime);
    if (isNaN(parsedCookingTime) || parsedCookingTime <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Cooking time must be a positive integer in minutes.'
      });
    }

    // Process ingredients whether sent as array or string
    let formattedIngredients = ingredients;
    if (typeof ingredients === 'string') {
      formattedIngredients = ingredients
        .split('\n')
        .map(i => i.trim())
        .filter(i => i.length > 0);
    }

    if (!Array.isArray(formattedIngredients) || formattedIngredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one valid ingredient.'
      });
    }

    const newRecipe = await Recipe.create({
      title: title.trim(),
      category,
      ingredients: formattedIngredients,
      instructions: instructions.trim(),
      cookingTime: parsedCookingTime
    });

    res.status(201).json({
      success: true,
      message: 'Recipe successfully added to your collection!',
      data: newRecipe
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update an existing recipe
// @route   PUT /api/recipes/:id
exports.updateRecipe = async (req, res) => {
  try {
    const { title, category, ingredients, instructions, cookingTime } = req.body;

    if (cookingTime !== undefined && Number(cookingTime) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Cooking time must be a positive number.'
      });
    }

    let updateData = { ...req.body };

    if (typeof ingredients === 'string') {
      updateData.ingredients = ingredients
        .split('\n')
        .map(i => i.trim())
        .filter(i => i.length > 0);
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully!',
      data: updatedRecipe
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found or already deleted'
      });
    }

    res.status(200).json({
      success: true,
      message: `Recipe "${recipe.title}" removed successfully.`
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete recipe: ' + err.message
    });
  }
};
