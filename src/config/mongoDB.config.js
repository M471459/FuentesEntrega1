import mongoose from "mongoose";
import envs from "./env.config.js";
export const connectMongoDB = async () => {
  try {
    mongoose.connect(envs.MONGO_URL);
    console.log("Mongo DB Conectada");
  } catch (error) {
    console.log(error);
  }
};
