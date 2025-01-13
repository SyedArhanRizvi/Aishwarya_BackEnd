import { FoodProdSchema } from "../Models/product.Model.js";
import { v2 as cloudinary } from "cloudinary";
import dotn from "dotenv";
dotn.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addNewProductController = async (req, res) => {
  console.log(req.body);
  const {
    price,
    businessType = "Exporter, Supplier, Trader", 
    packagingSize,
    cultivationType,
    color,
    packagingType,
    countryOfOrigin,
    quality,
    containerWidth,
    location,
    usage,
    category,
    productName,
    foodType,
  } = req.body;

  try {
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageUrl = result.secure_url;
    }
console.log(imageUrl);

    const newProduct = new FoodProdSchema({
      price,
      businessType,
      packagingSize,
      cultivationType,
      color,
      packagingType,
      countryOfOrigin,
      quality,
      containerWidth,
      location,
      usage,
      category,
      productName,
      foodType,
      productImage: imageUrl, 
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error in addNewProductController:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

export const updatePrevProductController = async (req, res) => {
  console.log("Api hit ");
  
  const { prodID } = req.params;
  const {
    price,
    businessType,
    packagingSize,
    cultivationType,
    color,
    packagingType,
    countryOfOrigin,
    quality,
    containerWidth,
    location,
    usage,
    category,
    productName,
    foodType,
  } = req.body;

  try {
    const updatedProduct = await FoodProdSchema.findByIdAndUpdate(
      prodID,
      {
        $set: {
          price,
          businessType,
          packagingSize,
          cultivationType,
          color,
          packagingType,
          countryOfOrigin,
          quality,
          containerWidth,
          location,
          usage,
          category,
          productName,
          foodType,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

export const deleteOneProductController = async (req, res) => {
  const { prodID } = req.params;

  try {
    const deletedProduct = await FoodProdSchema.findByIdAndDelete(prodID);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
export const getAllFruits = async (req, res) => {
  console.log("Request Hit");
  try {
    const allFruits = await FoodProdSchema.find({ foodType: "Fruits" });
    if (!allFruits || allFruits.length === 0) {
      return res.status(404).json({ message: 'No fruits found' });
    }
    return res.status(200).json({ allFruits });
  } catch (error) {
    console.log("There are some errors in getAllFruits ", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send all fruits",
      error: error.message,
    });
  }
};

export const getAllVegetables = async (req, res) => {
  console.log("Api Hit");
  
  try {
    const allVegetables = await FoodProdSchema.find({ foodType: "Vegetables" });
    if (!allVegetables || allVegetables.length === 0) {
      return res.status(404).json({ message: 'No vegetables found' });
    }
    return res.status(200).json({ allVegetables });
  } catch (error) {

    console.log("There are some errors in getAllVegetables ", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

export const getAllProductController = async (req, res)=>{
  try {
    const allProds = await FoodProdSchema.find({});
    return res.status(200).json({allProds});
  } catch (error) {
    console.log("Some errors in getAllProductController ", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send all products",
      error: error.message,
    });
  }
}