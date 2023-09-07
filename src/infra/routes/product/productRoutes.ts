import { Request, Response, Router } from "express";

import { ProductRepositoryMongo } from "../../database/repositories/product/ProductRepositoryMongo";
import { ProductService } from "../../../app/services/product/ProductService";
import { ProductUseCase } from "../../../app/usecases/product/ProductUseCase";
import { ProductController } from "../../web/controllers/product/ProductController";

const router = Router();

const service: ProductService = new ProductService(
  new ProductRepositoryMongo()
);

const controller = new ProductController(new ProductUseCase(service));

router.get("/", (req: Request, res: Response) =>
  controller.getAllProducts(req, res)
);
router.get("/:id", (req: Request, res: Response) =>
  controller.getProductById(req, res)
);
router.post("/", (req: Request, res: Response) =>
  controller.createProduct(req, res)
);
router.put("/:id", (req: Request, res: Response) =>
  controller.updateProduct(req, res)
);
router.delete("/:id", (req: Request, res: Response) =>
  controller.deleteProduct(req, res)
);

export default router;
