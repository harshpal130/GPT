const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors")
const app = express();
const path = require("path");

app.set("trust proxy", 1);
//routes
const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chats.routes")


//middleware

// app.use(cors({
//     origin: `http://localhost:5173`,
//     "https://gpt-lemon-xi.vercel.app",
//     credentials: true
// }))

const allowedOrigins = [
  "http://localhost:5173",
  "https://gpt-lemon-xi.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "../public")))

//using routes
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)

app.get("*name", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports  = app