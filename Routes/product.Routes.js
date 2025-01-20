import { Router } from "express";
import { addNewProductController, getAllProductController, getAllVegetables, deleteOneProductController, getAllFruits, updatePrevProductController, getCategoriesFoodItem } from "../Controllers/prodcut.Controller.js";
import { uploadSingleImage } from "../Middlewares/multer.upload.js";
const productRoutes = Router();

productRoutes.post("/addNewProduct", uploadSingleImage, addNewProductController);
productRoutes.put("/updatePrevProd/:prodID", updatePrevProductController);
productRoutes.post("/deleteOneProd/:prodID",deleteOneProductController);
productRoutes.get("/getAllFruits", getAllFruits);
productRoutes.get("/getAllVegetables", getAllVegetables);
productRoutes.get("/getAllProducts", getAllProductController);
productRoutes.get("/categories-foods/:category", getCategoriesFoodItem);

export default productRoutes;