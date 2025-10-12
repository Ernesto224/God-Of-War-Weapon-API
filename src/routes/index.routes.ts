import express, { Router } from 'express';
import gameRoutes from './game.routes';
import weaponRoutes from './weapon.routes';

const router: Router = express.Router();

// Main routes
router.use('/games', gameRoutes);

router.use('/weapons', weaponRoutes);

export default router;