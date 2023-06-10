import express from 'express';
import { addDepartment, deleteDepartment, getDepartment, getDepartments, updateDepartment } from '../controllers/deparmentController.js';
import { verifyUser } from '../utils/verifyToken.js';
const router = express.Router();

router.get('/', verifyUser, getDepartments);
router.get('/:id', verifyUser, getDepartment);
router.post('/', verifyUser, addDepartment);
router.put('/:id', verifyUser, updateDepartment);
router.delete('/:id', verifyUser, deleteDepartment);

export default router;