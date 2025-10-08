/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       description: Represents a God of War game in the series
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - releaseYear
 *         - summary
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the game
 *         name:
 *           type: string
 *           description: Title of the game
 *         releaseYear:
 *           type: string
 *           description: Release date of the game
 *         summary:
 *           type: string
 *           description: Brief overview of the game's story
 * 
 *     Movement:
 *       description: Represents a special combat move for a weapon
 *       type: object
 *       required:
 *         - unlockLevel
 *         - combination
 *       properties:
 *         unlockLevel:
 *           type: integer
 *           description: Character level required to unlock this move
 *         combination:
 *           type: string
 *           description: Controller input combination to perform the move
 * 
 *     Weapon:
 *       description: Represents a weapon that can be used in combat
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
 *           description: Unique identifier for the weapon
 *         name:
 *           type: string
 *           description: Name of the weapon
 *         description:
 *           type: string
 *           description: Detailed description of the weapon's background and capabilities
 *         archives:
 *           type: array
 *           items:
 *             type: string
 *           description: Collection of media resources related to the weapon
 *         maxLevel:
 *           type: integer
 *           description: Maximum upgrade level achievable for this weapon
 *         movements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Movement'
 *           description: Collection of special moves available for this weapon
 * 
 *     PaginatedResponse:
 *       description: Generic paginated response structure
 *       type: object
 *       properties:
 *         count:
 *           type: integer
 *           description: Total number of items available
 *         pages:
 *           type: integer
 *           description: Total number of pages
 *         page:
 *           type: integer
 *           description: Current page number
 *         items:
 *           type: array
 *           description: Array of items for the current page
 * 
 *     ApplicationResponse:
 *       description: Standard API response wrapper
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the operation completed successfully
 *         message:
 *           type: string
 *           description: Human-readable result message
 *         data:
 *           type: object
 *           description: Response payload (when applicable)
 * 
 *     Error:
 *       description: Error response structure
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           description: Always false for error responses
 *         message:
 *           type: string
 *           description: Description of what went wrong
 */

// Export type to be used in routes
export const SWAGGER_SCHEMAS = true;