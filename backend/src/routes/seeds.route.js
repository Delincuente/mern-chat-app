const express = require("express");
const router = express.Router();
const seeds = require("../seeds/users.seed");

router.get("/users", seeds.seedUsers);
module.exports = router;