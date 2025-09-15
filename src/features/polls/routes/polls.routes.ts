import { Hono } from "hono";
import {
  createPollOptions,
  createPollQuestion,
  getAllPolls,
} from "../controllers/polls.js";
import {
  validatePostOption,
  validatePostQuestion,
} from "../middlewares/polls.js";

const pollRoutes = new Hono();

pollRoutes.post("/question", validatePostQuestion, ...createPollQuestion);

pollRoutes.get("/", ...getAllPolls);

pollRoutes.post("/options", validatePostOption, ...createPollOptions);

export default pollRoutes;
