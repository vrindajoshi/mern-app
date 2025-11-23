import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true // createdAt and updatedAt fields
});
// the schema defines the parameters that are included in each object

const Product = mongoose.model('Product', productSchema);
// mongoose will automatically convert Product into products (wants capitalized singular form of the model name)

export default Product;