import express, { Router } from 'express';
import * as weaponController from '../controllers/weaponController';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Weapons
 *   description: Weapon management API endpoints
 */

/**
 * @swagger
 * /weapons/all:
 *   get:
 *     summary: Get all weapons with pagination
 *     tags: [Weapons]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of weapons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Weapons fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       description: Total number of weapons
 *                       example: 15
 *                     pages:
 *                       type: integer
 *                       description: Total number of pages
 *                       example: 2
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                       example: 1
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Weapon'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error fetching weapons
 */
router.get('/all', weaponController.getAllWeapons);

/**
 * @swagger
 * /weapons/{id}:
 *   get:
 *     summary: Get a weapon by ID
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Weapon ID
 *     responses:
 *       200:
 *         description: Weapon found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Weapon fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Weapon'
 *       204:
 *         description: Weapon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', weaponController.getWeapon);

export default router;