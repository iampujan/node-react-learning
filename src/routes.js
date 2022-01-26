import { Router } from 'express';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import authenticate from './middlewares/authenticate';

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/auth', authRoutes);
router.use('/users', authenticate, userRoutes);
router.use('/contacts', authenticate, contactRoutes);

export default router;