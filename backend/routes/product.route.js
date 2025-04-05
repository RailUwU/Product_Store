import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';

const router = express.Router();

router.get("/", async (req,res)=>{
     try {
        const products = await Product.find({});
        res.status(200).json({
            success:true,
            data:products
        });
     } catch (error) {
        console.log("Error in Fetching");
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
     }
})

router.post("/", async (req,res)=>{
    const product = req.body;

    if (!product.name || !product.name || !product.image){
        return res.status(400).json({
            success:false,
            message:"Please provide all fields"
        });
    }
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({
            success:true,
            data: newProduct    
        });
    } catch (error){
        console.log("Error is Creation : ",error.message);
        res.status(500).json({
            success:false,
            message: "Server Error",
        })
    }
});

router.delete("/:id",async (req,res)=>{
    const { id } = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Product Deleted"
        });
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"404 Not Found HAAHAHHA"
        })
    }
});

router.put("/:id", async (req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success:false,
            message:"404 Not Found",
        });
    }
    
    try {
        const updatedProd = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({
            success:true,
            data: updatedProd,
        });
    } catch (error) {
        console.log("Unable to Update");
        res.status(200).json({
            success:false,
            message:"Server Error"
        });
    }
});

export default router;
