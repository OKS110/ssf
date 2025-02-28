import express from 'express';
import * as controller from '../controller/guestController.js';

const router = express.Router();

router
    .post('/all', controller.getGuestList)
    .post('/member', controller.getGuest)
    .post('/add', controller.addGuest) // 비회원 업데이트
    .post('/addOrder', controller.addGuestOrder)    // 비회원 주문 테이블 업데이트


export default router;