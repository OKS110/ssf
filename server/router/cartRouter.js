import express from 'express';
import * as controller from '../controller/cartController.js';

const router = express.Router();

router
    .post('/add', controller.saveToCart)
    .post('/getId', controller.getCustomerId);
// router.post('/items', controller.getCartItems);

export default router;