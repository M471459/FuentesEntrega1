import { Router } from "express";
import productsManagers from "../managers/ProductManager.js";
import { checkproductData } from "../middlewares/checkProductData.js";

const ProductRouter = Router();

ProductRouter.get("/products", async (req, res) => {
  const { limit } = req.query;
  console.log(limit);
  try {
    const products = await productsManagers.getProducts(limit);
    res.send(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

ProductRouter.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productFound = await productsManagers.getProductsbyId(id);
    if (!productFound)
      return res.status(404).json({
        status: "error",
        msg: `No existe el servicio con el id ${id}`,
      });
    res.status(200).json({ status: "ok", productFound });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

ProductRouter.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productsManagers.updateProduct(id, body);
    if (!product) return `No existe el servicio con el id ${id}`;
    res.send(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

ProductRouter.post("/products", checkproductData, async (req, res) => {
  try {
    const body = req.body;
    const product = await productsManagers.addProduct(body);
    res.status(201).json({ status: "ok", product });
    console.log("Producto agregado con exito!");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

ProductRouter.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsManagers.getProductsbyId(id);
    if (!product)
      return res.status(404).json({
        status: "error",
        msg: `No existe el servicio con el id ${id}`,
      });

    await productsManagers.deleteProduct(id);
    res.status(200).json({
      status: "ok",
      msg: `Producto con el ID ${id} eliminado con éxito`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

export default ProductRouter;
