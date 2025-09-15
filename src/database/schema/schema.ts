import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const polls = pgTable("polls", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const options = pgTable("options", {
  id: uuid("id").primaryKey().defaultRandom(),
  poll_id: uuid("poll_id")
    .references(() => polls.id)
    .notNull(),
  option: text("option").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const vote = pgTable("vote", {
  id: uuid("id").primaryKey().defaultRandom(),
  poll_id: uuid("poll_id")
    .references(() => polls.id)
    .notNull(),
  option_id: uuid("option_id")
    .references(() => options.id)
    .notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
