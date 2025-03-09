import express from 'express';
import * as guestController from '../controller/guestController.js'; // ✅ 여기서 문제가 발생할 수 있음

const router = express.Router();

router.post('/add', guestController.addGuest);  // 🚨 여기가 undefined일 가능성 있음
router.post('/addOrder', guestController.addGuestOrder);

export default router;
