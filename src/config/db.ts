
import mongoose from "mongoose";
import dns from "node:dns";
import dotenv from "dotenv";
import logging from "./logging";

dotenv.config();

// Only use this workaround locally.
// Let Vercel use its own DNS resolver.
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const NAMESPACE = "Database";

const mongo_URL = process.env.MONGODB;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

const connectToDb = async (): Promise<typeof mongoose> => {
  if (!mongo_URL) {
    throw new Error("MONGODB environment variable is missing");
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongo_URL)
      .then((connection) => {
        logging.info(NAMESPACE, "Database connected successfully");
        return connection;
      })
      .catch((error) => {
        cached.promise = null;
        logging.error(NAMESPACE, "Database connection failed", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default connectToDb;
