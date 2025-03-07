import express from 'express';
import * as controller from '../controller/mypageController.js';

const router = express.Router();

router
    .post('/myinfo', controller.getMyinfo)
    .post('/updateInfo',controller.updateMyinfo)
    .post('/updateDelivery', controller.updateDelivery)
    .post('/updateDeliveryExtra', controller.updateDeliveryExtra)
    .post('/updateDeliveryExtra2', controller.updateDeliveryExtra2)
    .post('/deleteDelivery', controller.deleteDelivery)
    // .post('/getId', controller.getId)
    .post('/addLike', controller.addLike)
    .post('/deleteLike', controller.deleteLike)
    .post('/getAllLike', controller.getAllLike);


export default router;