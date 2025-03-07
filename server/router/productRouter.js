import express from 'express';
import * as controller from '../controller/productController.js';

const router = express.Router();

router
    .post('/all', controller.getProductAll)
    .post('/item', controller.getItem)
    .post('/item2', controller.getItem2);

export default router;