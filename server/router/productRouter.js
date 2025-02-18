import express from 'express';
import * as controller from '../controller/productController.js';

const router = express.Router();

router.post('/category', controller.getCategoryItems)
        .post('/rank', controller.getRankItems);

export default router;