import { Hono } from "hono";
import { createPostVote } from "../controllers/votes.js";
import { validatePostVote } from "../middlewares/votes.js";

const voteRoutes = new Hono();

voteRoutes.post("/", validatePostVote, ...createPostVote);

export default voteRoutes;
