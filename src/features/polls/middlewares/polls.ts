import { metadata } from "@/data/metadata.js";
import { options, polls } from "@/database/schema/schema.js";
import { errorResponse } from "@/utils/response.js";
import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";

export const validatePostQuestion = zValidator(
  "json",
  createInsertSchema(polls),
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

export const validatePostOption = zValidator(
  "json",
  createInsertSchema(options),
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
