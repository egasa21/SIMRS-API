import { Router } from "express";
import multer from 'multer'
import { addDoctor, deleteDoctor, getDoctor, getDoctors, updateDoctor } from "../controllers/doctorController.js";
import { verifyUser } from "../utils/verifyToken.js";

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/', verifyUser, getDoctors);
router.get('/:id', verifyUser, getDoctor);
router.post('/', verifyUser, upload.single('image'), addDoctor);
router.put('/:id', verifyUser, updateDoctor);
router.delete('/:id', verifyUser, deleteDoctor);


export default router;