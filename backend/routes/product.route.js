import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

// endpoint to create a new product (POST request to /api/products)
router.post("/", createProduct); // creates the /products endpoint

// endpoint to delete a product by id (DELETE request to /api/products/:id)
router.delete("/:id", deleteProduct); // creates the /products/:id endpoint

// endpoint to get all products (GET request to /api/products)
router.get("/", getProducts);

// endpoint to update a product by id (PUT request to /api/products/:id)
router.put("/:id", updateProduct ); // creates the /products/:id endpoint

export default router;