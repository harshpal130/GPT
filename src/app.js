const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

//routes
const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chats.routes")


//middleware

app.use(express.json());
app.use(cookieParser())

//using routes
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)

module.exports  = app