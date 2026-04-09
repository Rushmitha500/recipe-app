const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

mongoose.connect('mongodb://127.0.0.1:27017/recipeDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('MongoDB connection failed:');
    console.log(err);
  });

const RecipeSchema = new mongoose.Schema({
  recipeName: String,
  cuisineType: String,
  cookingTime: String,
  difficulty: String,
  image: String,
  description: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json({
      statusCode: 200,
      data: recipes,
      message: 'Recipes fetched successfully'
    });
  } catch (error) {
    console.log('GET /recipes error:');
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Error fetching recipes'
    });
  }
});

app.post('/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipe({
      recipeName: req.body.recipeName,
      cuisineType: req.body.cuisineType,
      cookingTime: req.body.cookingTime,
      difficulty: req.body.difficulty,
      image: req.body.image,
      description: req.body.description
    });

    await newRecipe.save();

    res.json({
      statusCode: 200,
      message: 'Recipe added successfully'
    });
  } catch (error) {
    console.log('POST /recipes error:');
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: 'Error saving recipe'
    });
  }
});

app.get('/seed', async (req, res) => {
  try {
    await Recipe.deleteMany({});

    await Recipe.insertMany([
      {
        recipeName: 'Creamy Pasta',
        cuisineType: 'Italian',
        cookingTime: '25 mins',
        difficulty: 'Easy',
        image: '/images/pasta.png',
        description: 'A rich and creamy pasta recipe with herbs and cheese.'
      },
      {
        recipeName: 'Classic Burger',
        cuisineType: 'American',
        cookingTime: '20 mins',
        difficulty: 'Easy',
        image: '/images/burger.png',
        description: 'A juicy burger with fresh vegetables and a soft bun.'
      },
      {
        recipeName: 'Cheese Pizza',
        cuisineType: 'Italian',
        cookingTime: '30 mins',
        difficulty: 'Medium',
        image: '/images/pizza.png',
        description: 'A delicious pizza topped with cheese and tomato sauce.'
      }
    ]);

    res.send('Database seeded successfully');
  } catch (error) {
    console.log('SEED error:');
    console.log(error);
    res.status(500).send('Error seeding database');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});