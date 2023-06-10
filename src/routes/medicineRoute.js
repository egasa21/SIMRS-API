import express from 'express'
import { addMedicine, deleteMedicine, getMedicine, getMedicines, updateMedicine } from '../controllers/medicineController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/', verifyUser, addMedicine);
router.get('/:id', verifyUser, getMedicine);
router.get('/', verifyUser, getMedicines);
router.put('/:id', verifyUser, updateMedicine);
router.delete('/:id', verifyUser, deleteMedicine);

export default router;