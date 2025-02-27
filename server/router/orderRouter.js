import express from 'express';
import * as controller from '../controller/orderController.js';

const router = express.Router();

router
    .post('/add', controller.addOrderItem);


export default router;