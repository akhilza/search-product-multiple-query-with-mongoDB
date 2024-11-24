import mongoose from "mongoose";
import { ProductModel } from "../models/productModel";

const Product = mongoose.model("Product", ProductModel);

export const addNewProduct = (req, res) => {
    let newProduct = new Product(req.body);
    newProduct.save((err, products) => {
        if (err) {
            res.send(err)
        }
        res.json(products)
    });
};

export const addAllNewProduct = (req, res) => {
    let newProduct = new Product(req.body);
    Product.insertMany(newProduct, { validate: false })
    .then((result) => {
        console.log('Products inserted:', result);
    })
    .catch((error) => {
        console.error('Error inserting products:', error);
    });
};

export const getAllProduct = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.send(err)
        }
        res.json(products)
    })
};


export const searchProducts = async (req, res) => {
    try {
        const searchReq = req.query.search;
        
        const minPrice = parseFloat(req.query.minPrice) || 0; 
        const maxPrice = parseFloat(req.query.maxPrice) || Infinity;

        //  name and category search query
        // const products = await Product.find({
        //     $or: [
        //         { name: { $regex: searchReq, $options: "i" } },
        //         { category: { $regex: searchReq, $options: "i" } },
        //     ],
        // }).sort({ price: 1 });

         // Multiple query conditions

        // const products = await Product.find({
        //     $and: [
        //         {
        //             $or: [
        //                 { name: { $regex: searchReq, $options: "i" } },
        //                 { category: { $regex: searchReq, $options: "i" } },
        //             ],
        //         },
        //         { price: { $gte: minPrice, $lte: maxPrice } },
        //     ],
        // }).sort({ price: 1 });


        // Dynamically build query conditions
        const conditions = [];

        if (searchReq) {
            conditions.push({
                $or: [
                    { name: { $regex: searchReq, $options: "i" } },
                    { category: { $regex: searchReq, $options: "i" } },
                ],
            });
        }

        if (req.query.minPrice || req.query.maxPrice) {
            conditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
        }
        // Combine conditions with $and only if there are multiple
        const query = conditions.length > 0 ? { $and: conditions } : {};

        const products = await Product.find(query).sort({ price: 1 });

        if (products.length > 0) {
            res.status(200).json(products)
         } 
        else {
            res.status(404).json({ message: "No products found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error searching for products", error });
    }
};