const express = require("express");

const router = express.Router();
const authControllers = require('../controllers/auth.contoller')

router.post("/register",authControllers.registerUser)
router.post("/login",authControllers.login)


module.exports = router