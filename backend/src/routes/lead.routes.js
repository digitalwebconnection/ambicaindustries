import { Router } from 'express';
import {
  createLead,
  getLeads,
  updateLeadStatus,
  deleteLead
} from '../controllers/lead.controller.js';
import { protect } from '../middleware/auth.js';
import { leadLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public: Submit a lead / assessment request
router.post('/', leadLimiter, createLead);

// Protected Admin: View & manage leads
router.get('/', protect, getLeads);
router.patch('/:id/status', protect, updateLeadStatus);
router.delete('/:id', protect, deleteLead);

export default router;
