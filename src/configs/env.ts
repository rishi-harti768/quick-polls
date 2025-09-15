import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, DATABASE_URL } = process.env;
export const NODE_ENV = process.env.NODE_ENV || "development";
