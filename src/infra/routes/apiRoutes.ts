import { Request, Response, Router } from "express";
import productRoutes from "./product/productRoutes";
import categoryRouter from "./category/categoryRoutes";

const apiRouter = Router();

apiRouter.use("/products", productRoutes);
apiRouter.use("/categories", categoryRouter);

apiRouter.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Bem vindo a API" });
});

export default apiRouter;
