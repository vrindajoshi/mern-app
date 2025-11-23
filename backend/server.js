import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json()); // middleware to parse JSON request bodies, allows us to accept JSON data


// endpoint to create a new product (POST request to /api/products)
app.post("/api/products", async (req, res) => { // creates the /products endpoint
    const product = req.body; // gets the product data from the request body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json( {success: false, message: "Please provide name, price and image for the product"} );
    }

    const newProduct = new Product(product); // creates a new product instance

    try {
        await newProduct.save(); // saves the product to the database
        res.status(201).json( {success: true, data: newProduct} ); // returns the created product with status 201 (created)
    } catch (error) {
        console.error("Error in Create Product", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
});

// postman desktop app can be used to test the endpoint

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
});

// STuF4EFC5rUJkIsp 
// vrindajoshi30_db_user