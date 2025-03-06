import express from 'express';
import * as controller from '../controller/cartController.js';

const router = express.Router();

router
    .post('/add', controller.saveToCart)
    .post('/getId', controller.getCustomerId)
    .post('/items', controller.getCartItems)
    .post('/updateQty', controller.updateDetailQty)
    .post('/changeQty', controller.changeQty);

export default router;