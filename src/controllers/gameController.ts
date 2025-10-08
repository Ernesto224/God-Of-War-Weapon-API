import { Request, Response, NextFunction } from 'express';
import { Game, ApplicationResponse } from '../types/types';
import prismaClient from '../config/prismaConfig';
import { successCode, noContentCode, badRequestCode, notFoundCode } from '../utils/codes';
import { format } from 'date-fns';
import {
    calculatePagination,
    createPaginatedResponse,
    createErrorResponse,
    createSuccessResponse
} from '../services/responseService';

/**
 * Format a game from database to API response format
 */
const formatGame = (game: any): Game => ({
    id: game.id,
    name: game.name,
    releaseYear: format(game.releaseYear, 'dd-MM-yyyy'),
    summary: game.summary
});

/**
 * Fetch games from database with pagination
 */
const fetchPaginatedGames = async ({ skip, limit }: { skip: number, limit: number }) => {
    return Promise.all([
        prismaClient.game.findMany({
            skip,
            take: limit,
            orderBy: { releaseYear: 'desc' }
        }),
        prismaClient.game.count()
    ]);
};

/**
 * Get all games with pagination
 */
export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pagination = calculatePagination(
            Number(req.query.page),
            Number(req.query.limit)
        );

        const [games, totalCount] = await fetchPaginatedGames(pagination);

        if (totalCount === 0) {
            return res.status(noContentCode).json(
                createErrorResponse('No games found in the database', true)
            );
        }

        const formattedGames = games.map(formatGame);
        const response = createPaginatedResponse(
            formattedGames,
            totalCount,
            pagination.page,
            pagination.limit,
            'Games fetched successfully'
        );

        return res.status(successCode).json(response);

    } catch (error) {

        next(error);

    }
}

/**
 * Get a single game by ID
 */
export const getGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(badRequestCode).json(
                createErrorResponse('Game ID is required')
            );
        }

        const game = await prismaClient.game.findFirst({
            where: { id }
        });

        if (!game) {
            return res.status(notFoundCode).json(
                createErrorResponse('Game not found')
            );
        }

        const formattedGame = formatGame(game);
        const response = createSuccessResponse(
            formattedGame,
            'Game fetched successfully'
        );

        return res.status(successCode).json(response);

    } catch (error) {

        next(error);

    }
}