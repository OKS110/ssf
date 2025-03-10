import express from "express";
import * as reviewController from "../controller/reviewController.js";

const router = express.Router();

// ✅ 리뷰 저장 API
router.post("/add", reviewController.addReview);


export default router;
