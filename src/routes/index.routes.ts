import express, { Router } from 'express';
import gameRoutes from './game.routes';

const router: Router = express.Router();

// Main routes
router.use('/games', gameRoutes);

export default router;