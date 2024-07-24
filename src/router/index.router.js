import ProductRouter from "./ProductRouter.js";
import CartRouter from "./CartRouter.js";
import { Router } from "express";

const router = Router();

router.use("/products", ProductRouter);
router.use("/carts", CartRouter);

export default router;
