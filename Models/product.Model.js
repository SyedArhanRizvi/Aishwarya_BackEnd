import mongoose from "mongoose";

const foodProdSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true }, 
    businessType: {
      type: String,
      default: "Exporter, Supplier, Trader",
      enum: ["Exporter", "Supplier", "Trader"], 
    },
    packagingSize: { type: String, required: true }, 
    cultivationType: {
      type: String,
    },
    color: { type: String }, 
    packagingType: { type: String }, 
    countryOfOrigin: { type: String, required: true }, 
    quality: { type: String }, 
    containerWidth: { type: String }, 
    location: { type: String, required: true }, 
    usage:{type:String},
    category:{type:String, required:true},
    productName:{type:String},
    foodType:{type:String, required:true},
    productImage:{type:String, required:true}
  },
  { timestamps: true }
);

export const FoodProdSchema = mongoose.model("FoodProdSchemas", foodProdSchema);
