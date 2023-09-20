import { Request, Response, Router } from "express";
import { CategoryRepositoryMongo } from "../../database/repositories/category/CategoryRepositoryMongo";
import { CategoryService } from "../../../app/services/category/CategoryService";
import { CategoryUseCase } from "../../../app/usecases/category/CategoryUseCase";
import { CategoryController } from "../../web/controllers/category/CategoryController";

const router = Router();

const repository = new CategoryRepositoryMongo();
const service: CategoryService = new CategoryService(repository);
const useCase: CategoryUseCase = new CategoryUseCase(service);
const controller = new CategoryController(useCase);

router.get("/", (req: Request, res: Response) =>
  controller.getAllCategories(req, res)
);
router.get("/:id", (req: Request, res: Response) =>
  controller.getCategoryById(req, res)
);
router.post("/", (req: Request, res: Response) =>
  controller.createCategory(req, res)
);
router.put("/:idParams", (req: Request, res: Response) =>
  controller.updateCategory(req, res)
);
router.delete("/:id", (req: Request, res: Response) =>
  controller.deleteCategory(req, res)
);

export default router;
