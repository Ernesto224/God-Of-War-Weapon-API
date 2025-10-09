import express, { Router } from 'express';
import * as weaponController from '../controllers/weaponController';

const router: Router = express.Router();

router.get('/all', weaponController.getAllWeapons);

router.get('/:id', weaponController.getWeapon);

export default router;