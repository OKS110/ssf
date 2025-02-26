import express from 'express';
import * as controller from '../controller/guestController.js';

const router = express.Router();

router
    .post('/all', controller.getGuestList)
    .post('/member', controller.getGuest);
    


export default router;