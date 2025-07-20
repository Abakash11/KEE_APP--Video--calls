import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.mjs';
import getStreamToken from '../controllers/chat.controllers.mjs';

const router=express.Router();
router.get('/token',authMiddleware,getStreamToken)
export default router;
