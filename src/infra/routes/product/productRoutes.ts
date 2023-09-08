import { Request, Response, Router } from "express";
import { configParams } from "./configParams";

const router = Router();

const controller = configParams();

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
