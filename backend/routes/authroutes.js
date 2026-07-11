import express from "express";
import { registerUser, loginUser } from "../controllers/authcontroller.js";
import {
    registerValidation,
    loginValidation,
  } from "../validations/authvalidation.js";
  
  import validate from "../middleware/validationmiddleware.js";

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
  );
  
  router.post(
    "/login",
    loginValidation,
    validate,
    loginUser
  );
export default router;