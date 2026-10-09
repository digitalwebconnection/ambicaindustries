import { Router } from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Protected admin upload route
router.post('/', protect, uploadImage);

export default router;
