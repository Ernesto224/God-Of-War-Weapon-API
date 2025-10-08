import express, { Router } from 'express';
import * as weaponController from '../controllers/weaponController';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Weapons
 *   description: Operations related to weapons in God of War
 */

/**
 * @swagger
 * /weapons/all:
 *   get:
 *     summary: Retrieve all weapons
 *     description: Fetches a paginated list of all weapons with their movements
 *     tags: [Weapons]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The page of results to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: The number of weapons to retrieve per page
 *     responses:
 *       200:
 *         description: Successfully retrieved list of weapons
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApplicationResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: '#/components/schemas/PaginatedResponse'
 *                         - type: object
 *                           properties:
 *                             items:
 *                               type: array
 *                               items:
 *                                 $ref: '#/components/schemas/Weapon'
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