import express from "express";
import ProductRouter from "./router/ProductRouter.js";
import CartRouter from "./router/CartRouter.js";

const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", ProductRouter);
app.use("/api", CartRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el Puerto ${PORT}`);
});
