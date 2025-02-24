import express from 'express';
import * as controller from '../controller/mypageController.js';

const router = express.Router();

router
    .post('/myinfo', controller.getMyinfo);


export default router;