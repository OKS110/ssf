import express from 'express';
import * as controller from '../controller/orderController.js';

const router = express.Router();

router
    .post('/add', controller.addOrderItem)
    .post('/all', controller.pullOrderList)


export default router;