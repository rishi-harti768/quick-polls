import { metadata } from "@/data/metadata.js";
import { db } from "@/database/drizzle.js";
import { vote } from "@/database/schema/schema.js";
import { errorResponse } from "@/utils/response.js";
import { createFactory } from "hono/factory";

const factory = createFactory();

export const createPostVote = factory.createHandlers(async (c) => {
  const v: typeof vote.$inferInsert = await c.req.valid("json" as never);
  try {
    await db.insert(vote).values(v);
  } catch (error) {
    return c.json(
      errorResponse(500, "Failed to create vote", metadata, {
        code: "INTERNAL_SERVER_ERROR",
        details: "Failed to create vote",
      })
    );
  }
});
