import { Router } from 'express';

import * as contactController from '../controllers/contacts';
import { contactValidator, findContact } from '../validators/contactValidator';

const router = Router();

/**
 * GET /api/contacts
 */
router.get('/', contactController.fetchAll);

/**
 * GET /api/contacts/:id
 */
router.get('/:id', contactController.fetchById);

/**
 * POST /api/contacts
 */
router.post('/', contactValidator, contactController.create);

/**
 * PUT /api/contacts/:id
 */
router.put('/:id', contactValidator, findContact, contactController.update);

/**
 * DELETE /api/contacts/:id
 */
router.delete('/:id', findContact, contactController.deleteContact);

export default router;