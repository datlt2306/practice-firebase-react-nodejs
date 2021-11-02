import express from 'express';
const router = express.Router();
// middleware
import { adminCheck, checkAuth } from '../middlewares/auth';

// controller
import { create, read, update, remove, list } from '../controllers/category';

// routes
router.post('/category', checkAuth, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.patch('/category/:slug', checkAuth, adminCheck, update);
router.delete('/category/:slug', checkAuth, adminCheck, remove);

module.exports = router;
