import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

app.use(express.json()); // middleware to parse JSON request bodies, allows us to accept JSON data

app.use("/api/products", productRoutes)
// postman desktop app can be used to test the endpoint

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
});

// STuF4EFC5rUJkIsp 
// vrindajoshi30_db_user