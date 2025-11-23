import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import { mongo } from 'mongoose';

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

// endpoint to delete a product by id (DELETE request to /api/products/:id)
app.delete("/api/products/:id", async (req, res) => { // creates the /products/:id endpoint
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id); // deletes the product with the given id
        res.status(200).json( {success: true, message: "Product deleted successfully"} ); // returns success message
    } catch (error) {
        res.status(404).json( {success: false, message: "Product not found"} ); // returns error if product not found   
    }
});

// endpoint to get all products (GET request to /api/products)
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json( {success: true, data: products} );
    } catch (error) {
        console.error("Error in Fetching Products", error.message);
        res.status(500).json( {success: false, message: "Server Error"} );
    }
});

// endpoint to update a product by id (PUT request to /api/products/:id)
app.put("/api/products/:id", async (req, res) => { // creates the /products/:id endpoint
    const {id} = req.params;

    const productUpdates = req.body; // gets the updated product data from the request body

    if (!mongo.Types.ObjectId.isValid(id)) {
        return  res.status(404).json( {success: false, message: "Invalid product ID"} ); // returns error if id is invalid
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productUpdates, { new: true }); // updates the product with the given id
        res.status(200).json( {success: true, data: updatedProduct} ); // returns the updated product
    } catch (error) {
        res.status(500).json( {success: false, message: "Product not found"} ); // returns error if product not found   
    }
});

// postman desktop app can be used to test the endpoint

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
});

// STuF4EFC5rUJkIsp 
// vrindajoshi30_db_user