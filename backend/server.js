import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import taskRoutes from "./routes/taskroutes.js";
import {
    notFound,
    errorHandler,
  } from "./middleware/errormiddleware.js";
  import helmet from "helmet";
  import morgan from "morgan";
  import rateLimit from "express-rate-limit";


dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.json());

// Debug Middleware (Temporary)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test Route
app.get("/", (req, res) => {
  res.send("Task Manager API is Running...");
  console.log("test")
});

// Test POST Route
app.post("/health", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({
    success: true,
    message: "Test Route Working",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Invalid Route
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  });
  
  app.use(limiter);