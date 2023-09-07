import { Router } from "express";
import productRoutes from "./product/productRoutes";

const apiRouter = Router();

apiRouter.use("/products", productRoutes);

export default apiRouter;
