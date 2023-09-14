import { Request, Response, Router } from "express";

import { ProductService } from "../../../app/services/product/ProductService";
import { ProductUseCase } from "../../../app/usecases/product/ProductUseCase";
import { ProductRepositoryMongo } from "../../database/repositories/product/ProductRepositoryMongo";
import { ProductController } from "../../web/controllers/product/ProductController";

const router = Router();

const repository = new ProductRepositoryMongo();
const service: ProductService = new ProductService(repository);
const useCase: ProductUseCase = new ProductUseCase(service);
const controller = new ProductController(useCase);

router.get("/", (req: Request, res: Response) =>
  controller.getAllProducts(req, res)
);
router.get("/:id", (req: Request, res: Response) =>
  controller.getProductById(req, res)
);
router.post("/", (req: Request, res: Response) =>
  controller.createProduct(req, res)
);
router.put("/:idParams", (req: Request, res: Response) =>
  controller.updateProduct(req, res)
);
router.delete("/:id", (req: Request, res: Response) =>
  controller.deleteProduct(req, res)
);

export default router;
