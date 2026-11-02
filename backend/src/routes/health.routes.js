import { Router } from 'express';
import { getHealth } from '../controllers/health.controller.js';

const router = Router();

router.route('/health')
  .get(getHealth)
  .head(getHealth);

export default router;
