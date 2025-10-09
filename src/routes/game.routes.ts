import express, { Router } from 'express';
import * as gameController from '../controllers/gameController';

const router: Router = express.Router();

router.get('/all', gameController.getAllGames);

router.get('/:id', gameController.getGame);

export default router;