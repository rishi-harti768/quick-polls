import { metadata } from "@/data/metadata.js";
import { options, polls, vote } from "@/database/schema/schema.js";
import { errorResponse } from "@/utils/response.js";
import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";

export const validatePostVote = zValidator(
  "json",
  createInsertSchema(vote),
  (result, c) => {
    if (!result.success) {
      return c.json(
        errorResponse(400, "Bad Request", metadata, {
          code: "BAD_REQUEST",
          details: "Invalid request body",
        }),
        400
      );
    }
  }
);
