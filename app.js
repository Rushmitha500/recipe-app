const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/recipes', (req, res) => {
  const recipes = [
    {
      title: 'Creamy Pasta',
      image: '/images/pasta.png',
      link: 'About Pasta',
      description: 'A rich and creamy pasta recipe with herbs and cheese.'
    },
    {
      title: 'Classic Burger',
      image: '/images/burger.png',
      link: 'About Burger',
      description: 'A juicy burger with fresh vegetables and a soft bun.'
    },
    {
      title: 'Cheese Pizza',
      image: '/images/pizza.png',
      link: 'About Pizza',
      description: 'A delicious pizza topped with cheese and tomato sauce.'
    }
  ];

  res.json({ statusCode: 200, data: recipes, message: 'Success' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});