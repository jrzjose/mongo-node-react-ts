const env = process.env;

export const PORT = env.PORT ?? "8080";
export const HOST = env.HOST ?? "0.0.0.0";
export const SERVER_URL = `http://${HOST}:${PORT}`;

export const MONGODB_URI = env.MONGODB_URI ?? "mongodb://admin:adminpass@mongodb:27017/admin?authSource=admin";
export const DATABASE_NAME = env.DATABASE_NAME ?? "local";

export default {
    PORT,
    HOST,
    SERVER_URL,
    DATABASE_NAME
}