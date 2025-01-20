import mongoose from "mongoose";

const foodProdSchema = new mongoose.Schema(
  {
    businessType: {
      type: String,
      default: "Exporter, Supplier, Trader",
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
    foodType:{type:String, required:true, default:"Fruits"},
    productImage:{type:String, required:true},
    description:{type:String, required:true, min:10, max:50}
  },
  { timestamps: true }
);

export const FoodProdSchema = mongoose.model("FoodProdSchemas", foodProdSchema);
