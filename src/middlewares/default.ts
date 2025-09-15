import { metadata } from "@/data/metadata.js";
import { isDevelopmentEnv, isProductionEnv, isTestEnv } from "@/utils/env.js";
import { errorResponse } from "@/utils/response.js";
import type { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";

export const initDefaultMiddlewares = (app: Hono) => {
  if (isDevelopmentEnv()) {
    app.use(logger());
  }
  app.use(compress());
  app.use(trimTrailingSlash());
  // CORS
  app.use(
    "/*",
    cors({
      origin: "*",
      credentials: true,
      maxAge: 86400,
    })
  );

  // global error
  app.onError((err, c) => {
    console.error(err);
    return c.json(
      errorResponse(500, err.message, metadata, {
        code: "INTERNAL_SERVER_ERROR",
        details: err.message,
      }),
      500
    );
  });

  // not found
  app.notFound((c) => {
    return c.json(
      errorResponse(
        404,
        "The requested URL was not found on this server",
        metadata,
        {
          code: "NOT_FOUND",
          details: "The requested URL was not found on this server",
        }
      ),
      404
    );
  });
  // API rate limit
};
