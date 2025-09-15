import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PORT } from "./configs/env.js";
import { isDevelopmentEnv, isProductionEnv, isTestEnv } from "./utils/env.js";
import apiRoutes from "./routes/api.routes.js";
import { initDefaultMiddlewares } from "./middlewares/default.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Quick Polls!");
});

initDefaultMiddlewares(app);

app.route("/api", apiRoutes);

const server = serve(
  {
    fetch: app.fetch,
    port: PORT as unknown as number,
  },
  (info) => {
    console.info("Server is running, Info:", info);
    if (isProductionEnv()) console.info("On Production Environment");
    else if (isDevelopmentEnv()) console.info("On Development Environment");
    else if (isTestEnv()) console.info("On Test Environment");
  }
);

// gracefull shut down
process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
