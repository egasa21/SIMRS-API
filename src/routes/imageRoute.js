import express from 'express';
import { getImage } from '../controllers/imageController.js';

const router = express.Router();

// GET request to retrieve an image
router.get('/:imageName', getImage);

export default router;
