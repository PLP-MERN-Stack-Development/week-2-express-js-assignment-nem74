const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;


app.get('/api/products/:id', (req, res) => {
    res.send('Hello, World!');
});

app.use(bodyParser.json()); // Middleware to parse JSON bodies
const { v4: uuidv4 } = require('uuid'); // UUID for unique IDs     
// Sample in-memory products database
let products = [{
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid product data' });
  }

  const newProduct = {
    id: uuidv4(), // generate a unique ID
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct); // add to the product list

  res.status(201).json(newProduct); // send back the new product
});
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, description, price, category, inStock } = req.body;

  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'number' ||
    typeof category !== 'string' ||
    typeof inStock !== 'boolean'
  ) {
    return res.status(400).json({ error: 'Invalid product data' });
  }

  products[index] = {
    id: products[index].id, // Keep original ID
    name,
    description,
    price,
    category,
    inStock
  };

  res.json(products[index]);
});
app.delete('/api/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products.splice(index, 1);
    res.status(204).send(); // No content
});

// Custom middleware for request logging
function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next(); // move to the next middleware or route
}
// auth.js (or inside server.js)
function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === '123456') {
    next(); // allow request to continue
  } else {
    res.status(401).json({ error: 'Unauthorized. API key missing or invalid' });
  }
}

// Use the logger middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack); // log error in terminal
  res.status(500).json({ error: 'Something went wrong on the server.' });
}


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${3000}`);
});