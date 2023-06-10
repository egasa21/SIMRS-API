import express from 'express';
import { addAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', addAppointment);

export default router;
