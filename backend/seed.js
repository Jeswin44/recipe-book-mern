const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');

dotenv.config();

const sampleRecipes = [
  {
    title: 'Spicy Bangkok Street Noodles',
    category: 'Lunch',
    cookingTime: 20,
    ingredients: [
      '200g rice noodles',
      '150g fresh prawns, peeled',
      '2 cloves garlic, minced',
      '1 tbsp chili paste',
      '2 tbsp soy sauce',
      '1 fresh egg',
      'Bean sprouts and fresh coriander'
    ],
    instructions: 'Boil rice noodles for 3 minutes until al dente.\nHeat oil in a wok and sauté garlic with chili paste.\nAdd prawns and cook until pink.\nPush ingredients to the side and scramble the egg.\nToss in noodles, soy sauce, and bean sprouts. Serve hot with lime wedges.'
  },
  {
    title: 'Artisan Creamy Chocolate Ice Cream',
    category: 'Dessert',
    cookingTime: 25,
    ingredients: [
      '2 cups heavy cream',
      '1 cup whole milk',
      '3/4 cup granulated sugar',
      '1/2 cup unsweetened Dutch cocoa powder',
      '1/2 cup dark chocolate chips',
      '1 tsp pure vanilla extract',
      'Pinch of sea salt'
    ],
    instructions: 'Whisk cocoa powder, sugar, and milk in a saucepan over medium heat until dissolved.\nRemove from heat and stir in heavy cream and vanilla extract.\nChill the mixture in the refrigerator for at least 2 hours.\nChurn in an ice cream maker according to manufacturer instructions.\nFold in dark chocolate chips during the last 5 minutes of churning and freeze.'
  },
  {
    title: 'Crispy Russet Golden French Fries',
    category: 'Snack',
    cookingTime: 18,
    ingredients: [
      '4 large Russet potatoes',
      'Vegetable oil for frying',
      '1 tbsp sea salt',
      '1 tsp smoked paprika',
      '1/2 tsp garlic powder'
    ],
    instructions: 'Peel potatoes and slice into 1/4-inch even sticks.\nSoak potato sticks in cold water for 30 minutes to remove excess starch.\nDry thoroughly with paper towels.\nDouble-fry: First fry at 325°F (160°C) for 5 minutes until soft, remove and drain.\nSecond fry at 375°F (190°C) for 3 minutes until golden and ultra crispy.\nToss immediately with salt, paprika, and garlic powder.'
  },
  {
    title: 'Classic Fluffy Buttermilk Pancakes',
    category: 'Breakfast',
    cookingTime: 15,
    ingredients: [
      '2 cups all-purpose flour',
      '2 tbsp sugar',
      '2 tsp baking powder',
      '1/2 tsp baking soda',
      '1.5 cups buttermilk',
      '2 large eggs',
      '3 tbsp melted butter'
    ],
    instructions: 'Whisk together flour, sugar, baking powder, and baking soda in a large mixing bowl.\nIn a separate jug, whisk buttermilk, eggs, and melted butter.\nCombine wet and dry ingredients gently, leaving small lumps.\nHeat a lightly greased non-stick griddle over medium heat.\nPour 1/4 cup batter for each pancake.\nFlip when bubbles burst on the surface and cook underside until golden brown.'
  },
  {
    title: 'Creamy Tuscan Garlic Chicken Skillet',
    category: 'Dinner',
    cookingTime: 30,
    ingredients: [
      '2 boneless chicken breasts, sliced horizontally',
      '1 cup heavy cream',
      '1/2 cup chicken broth',
      '4 cloves garlic, minced',
      '1 cup baby spinach',
      '1/2 cup sun-dried tomatoes, drained',
      '1/2 cup grated Parmesan cheese',
      '1 tbsp Italian seasoning'
    ],
    instructions: 'Season chicken cutlets with Italian herbs, salt, and black pepper.\nSear in olive oil in a skillet over medium-high heat for 5 minutes each side until golden, then set aside.\nIn the same skillet, sauté minced garlic and sun-dried tomatoes for 1 minute.\nPour in chicken broth and heavy cream, bringing to a gentle simmer.\nStir in grated Parmesan and fresh baby spinach until wilted.\nReturn chicken to the skillet, spoon sauce over, and simmer for 3 minutes before serving.'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding.');

    // Remove existing recipes to prevent duplicates
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes.');

    // Insert sample recipes
    const created = await Recipe.insertMany(sampleRecipes);
    console.log(`Successfully seeded ${created.length} delicious culinary recipes!`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
