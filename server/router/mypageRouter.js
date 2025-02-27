import express from 'express';
import * as controller from '../controller/mypageController.js';

const router = express.Router();

router
    .post('/myinfo', controller.getMyinfo)
    .post('/updateInfo',controller.updateMyinfo);


export default router;