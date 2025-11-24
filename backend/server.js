import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from "path";

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json()); // middleware to parse JSON request bodies, allows us to accept JSON data

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}


// use the product routes for any requests to /api/products
app.use("/api/products", productRoutes);


// postman desktop app can be used to test the endpoint

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port '+ PORT);
});