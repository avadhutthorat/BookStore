import mongoose from "mongoose";
import config from "./config";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to atlas DB.");
    });

    mongoose.connection.on("error", () => {
      console.log("Error connecting to atlas DB.");
    });

    const connection = await mongoose.connect(
      config.MONGO_URI_STRING as string
    );
    console.log({
      connection: connection.connections,
    });
  } catch (error) {
    console.log("Server wont be connecting-", error);
  }
};
