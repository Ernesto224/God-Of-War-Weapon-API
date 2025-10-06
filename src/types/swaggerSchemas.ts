/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - releaseYear
 *         - summary
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the game
 *         name:
 *           type: string
 *           description: The name of the game
 *         releaseYear:
 *           type: string
 *           description: Release date of the game in format DD/MM/YYYY, DD-MM-YYYY, or DD.MM.YYYY
 *         summary:
 *           type: string
 *           description: Brief description or summary of the game (max 500 characters)
 * 
 *     Movement:
 *       type: object
 *       required:
 *         - unlockLevel
 *         - combination
 *       properties:
 *         unlockLevel:
 *           type: integer
 *           description: Level required to unlock this movement
 *         combination:
 *           type: string
 *           description: Button combination to execute the movement
 * 
 *     Weapon:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - archives
 *         - maxLevel
 *         - movements
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the weapon
 *         name:
 *           type: string
 *           description: The name of the weapon
 *         description:
 *           type: string
 *           description: Detailed description of the weapon
 *         archives:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of archive URLs related to the weapon
 *         maxLevel:
 *           type: integer
 *           description: Maximum upgrade level for the weapon
 *         movements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Movement'
 *           description: List of special moves for this weapon
 * 
 *     ApplicationResponse:
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         message:
 *           type: string
 *           description: A message describing the result of the operation
 *         data:
 *           type: object
 *           description: The data returned by the operation (optional)
 * 
 *     Error:
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           description: Always false for errors
 *         message:
 *           type: string
 *           description: Error message describing what went wrong
 */

// Export type to be used in routes
export const SWAGGER_SCHEMAS = true;