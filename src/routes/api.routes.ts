import pollRoutes from "@/features/polls/routes/polls.routes.js";
import voteRoutes from "@/features/votes/routes/votes.routes.js";
import { Hono } from "hono";

const apiRoutes = new Hono();

apiRoutes.route("/polls", pollRoutes);

apiRoutes.route("/votes", voteRoutes);

export default apiRoutes;
