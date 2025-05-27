import express from "express";
const router = express.Router();

import seeds from "../seeds/users.seed.js";

router.get("/users", seeds.seedUsers);
export default router;