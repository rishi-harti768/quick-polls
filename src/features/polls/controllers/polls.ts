import { metadata } from "@/data/metadata.js";
import { db } from "@/database/drizzle.js";
import { options, polls } from "@/database/schema/schema.js";
import { errorResponse, successResponse } from "@/utils/response.js";
import { eq } from "drizzle-orm";
import { createFactory } from "hono/factory";

const factory = createFactory();

export const createPollQuestion = factory.createHandlers(async (c) => {
  const question: typeof polls.$inferInsert = await c.req.valid(
    "json" as never
  );
  try {
    await db.insert(polls).values(question);
  } catch (error) {
    return c.json(
      errorResponse(500, "Failed to create question", metadata, {
        code: "INTERNAL_SERVER_ERROR",
        details: "Failed to create question",
      })
    );
  }

  return c.json(
    successResponse(200, "Question created successfully", metadata)
  );
});

export const createPollOptions = factory.createHandlers(async (c) => {
  const options: typeof polls.$inferInsert = await c.req.valid("json" as never);
  try {
    await db.insert(polls).values(options);
  } catch (error) {
    return c.json(
      errorResponse(500, "Failed to create options", metadata, {
        code: "INTERNAL_SERVER_ERROR",
        details: "Failed to create options",
      })
    );
  }

  return c.json(successResponse(200, "Options created successfully", metadata));
});

export const getAllPolls = factory.createHandlers(async (c) => {
  const pollsList = await db
    .select()
    .from(polls)
    .leftJoin(options, eq(polls.id, options.poll_id));

  return c.json(
    successResponse(200, "Options created successfully", metadata, pollsList),
    200
  );
});
