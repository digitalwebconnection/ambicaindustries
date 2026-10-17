import { Router } from 'express';
import {
  loginAdmin,
  getAdminProfile,
  getDashboardStats
} from '../controllers/admin.controller.js';
import {
  getLeads,
  updateLeadStatus,
  deleteLead
} from '../controllers/lead.controller.js';
import { protect } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public auth routes
router.post('/login', loginLimiter, loginAdmin);

// Protected admin routes
router.get('/me', protect, getAdminProfile);
router.get('/stats', protect, getDashboardStats);
router.get('/leads', protect, getLeads);
router.patch('/leads/:id/status', protect, updateLeadStatus);
router.delete('/leads/:id', protect, deleteLead);

export default router;
