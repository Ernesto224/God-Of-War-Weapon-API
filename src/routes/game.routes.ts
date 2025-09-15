import express, { Router } from 'express';
import * as gameController from '../controllers/gameController';

const router: Router = express.Router();

// Schema swagger doc
/**
*@swagger
*    components:
*        schemas:
*            ApplicationResponse:
*                type: object
*                description: Standard application response structure
*                required:
*                    - success
*                    - message
*                properties:
*                    success:
*                        type: boolean
*                        description: Indicates if the operation was successful
*                    message:
*                        type: string
*                        description: Response message or error description
*                    data:
*                        type: object
*                        description: Response data payload
*                        nullable: true
*            Game:
*                type: object
*                required:
*                    - id
*                    - name
*                    - releaseYear
*                    - summary
*                properties:
*                    id:
*                        type: string
*                        format: uuid
*                        description: Unique game identifier
*                    name:
*                        type: string
*                        description: Game name
*                    releaseYear:
*                        type: string
*                        format: date
*                        description: Game release year
*                    summary:
*                        type: string
*                        description: Game summary or description
*            List:
*                type: object
*                description: Pagination structure for lists
*                required:
*                    - count
*                    - pages
*                    - page
*                    - items
*                properties:
*                    count:
*                        type: integer
*                        description: Total number of items
*                    pages:
*                        type: integer
*                        description: Total number of pages
*                    page:
*                        type: integer
*                        description: Current page number
*                    items:
*                        type: array
*                        description: Array of items for the current page
*/

// Endpoint swagger docs
/**
*@swagger
*paths:
*  /games/all:
*    get:
*      summary: Get all games with pagination
*      description: Retrieves a paginated list of all games ordered by release year (descending)
*      tags:
*        - Games
*      responses:
*        '200':
*          description: Games fetched successfully
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApplicationResponse'
*        '201':
*          description: No games found in the database
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApplicationResponse'
*        '500':
*          description: Internal server error
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApplicationResponse'
*/
router.get('/all', gameController.getAllGames);

export default router;