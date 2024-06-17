import { Router } from "express";
import cartManagers from "../managers/CartManager.js";

const CartRouter = Router();

CartRouter.post("/carts", async (req, res) => {
  try {
    const cart = await cartManagers.createCart();
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

CartRouter.post("/carts/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManagers.addProductToCart(cid, pid);
    res.status(201).json({ status: "ok", cart });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

CartRouter.get("/carts", async (req, res) => {
  try {
    const carts = await cartManagers.getCarts();
    res.send(carts);
    return carts;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

CartRouter.get("/carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cartFound = await cartManagers.getCartsbyID(id);
    if (!cartFound)
      return res.status(404).json({
        status: "error",
        msg: `No existe el carrito con el id ${id}`,
      });
    res.status(200).json({ status: "ok", cartFound });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

CartRouter.put("/carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.query;
    const product = await cartManagers.updateProduct(Number(id), {
      cantidadDePreguntas: Number(np),
      servicio: nombre,
    });
    if (!product) return `No existe el servicio con el id ${id}`;
    res.send(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
});

CartRouter.delete("/carts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await cartManagers.getcartbyId(Number(id));
    if (!product)
      return res.status(404).json({
        status: "error",
        msg: `No existe el servicio con el id ${id}`,
      });

    await cartManagers.deleteproduct(Number(id));
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

export default CartRouter;
