import express from "express";
import ProductRouter from "./router/ProductRouter.js";
import CartRouter from "./router/CartRouter.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import envs from "./config/env.config.js";
import router from "./router/index.router.js";

connectMongoDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", router);

const httpServer = app.listen(envs.PORT, () => {
  console.log(`Servidor escuchando en el Puerto ${envs.PORT}`);
});

const io = new Server(httpServer);
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
});
