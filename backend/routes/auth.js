import express from 'express';
import { createOrUpdateUser, currentUser } from '../controllers/auth';
import { adminCheck, checkAuth } from '../middlewares/auth';
const router = express.Router();

router.post('/create-or-update-user', checkAuth, createOrUpdateUser);
router.post('/current-user', checkAuth, currentUser);
router.post('/current-admin', checkAuth, adminCheck, currentUser);
module.exports = router;
