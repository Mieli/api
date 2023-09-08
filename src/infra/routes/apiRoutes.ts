import { Request, Response, Router } from "express";
import productRoutes from "./product/productRoutes";

const apiRouter = Router();

apiRouter.use("/products", productRoutes);

apiRouter.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Bem vindo a API" });
});

export default apiRouter;
