import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/otp.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/send', protect, sendOTP);
router.post('/verify', protect, verifyOTP);

export default router;