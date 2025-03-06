import express from 'express';
import * as controller from '../controller/deliUploadController.js';

const router = express.Router();

router.post('/', controller.upload.none(),controller.uploadData);
router.get('/', controller.getUp);


export default router;