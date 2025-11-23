import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // middleware to parse JSON request bodies, allows us to accept JSON data

// use the product routes for any requests to /api/products
app.use("/api/products", productRoutes);


// postman desktop app can be used to test the endpoint

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port 5000');
});

// STuF4EFC5rUJkIsp 
// vrindajoshi30_db_user