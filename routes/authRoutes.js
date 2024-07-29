import express from 'express';
const router = express.Router();
import { authUser, registerUser, upload } from '../controllers/authController.js';

router.post('/login', authUser);
router.post('/register', upload.single('profilePhoto'), registerUser);

export default router;
