import { NODE_ENV } from "@/configs/env.js";

export const isProductionEnv = () => {
  if (NODE_ENV === "production") return true;
  return false;
};

export const isDevelopmentEnv = () => {
  if (NODE_ENV === "development") return true;
  return false;
};

export const isTestEnv = () => {
  if (NODE_ENV === "test") return true;
  return false;
};
