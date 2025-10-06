import { Request, Response, NextFunction } from 'express';
import { List, Game, ApplicationResponse } from '../types/types';
import prismaClient from '../config/prismaConfig';
import { successCode, noContentCode, badRequestCode, notFoundCode } from '../utils/codes';
import { format } from 'date-fns';

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Page information
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Execute async query to mongo db, not include weapons only the games
        const [dataBaseItems, count] = await Promise.all([
            prismaClient.game.findMany({
                skip,
                take: limit,
                orderBy: { releaseYear: 'desc' }, // Sort Desc
            }),
            prismaClient.game.count(),
        ]);

        if (count == 0) {

            const response: ApplicationResponse = {
                success: true,
                message: 'Games fetched failed, not game exists'
            };

            return res.status(noContentCode).json(response);
        }

        // This method formats the date to "dd-MM-yyyy"
        const items = dataBaseItems.map(game => ({
            ...game,
            releaseYear: format(game.releaseYear, "dd-MM-yyyy"),
        }));

        const pages = Math.ceil(count / limit);

        const response: ApplicationResponse<List<Game>> = {
            success: true,
            message: 'Games fetched successfully',
            data: {
                count,
                pages,
                page,
                items,
            },
        };

        return res.status(successCode).json(response);

    } catch (error) {

        next(error);

    }
}

export const getGame = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Verify existing id in the request params
        if (!req.params.id) {

            const response: ApplicationResponse = {
                success: false,
                message: 'Game id is required'
            };

            return res.status(badRequestCode).json(response);
        }

        // Game id information
        const requestId: string = req.params.id;

        // Execute async query to mongo db, not include weapons only the games
        const game = await prismaClient.game.findFirst(
            {
                where: {
                    id: requestId
                }
            }
        );

        if (!game) {

            const response: ApplicationResponse = {
                success: false,
                message: 'Game fetched failed, not game exists'
            };

            return res.status(notFoundCode).json(response);
        }

        const response: ApplicationResponse<Game> = {
            success: true,
            message: 'Game fetched successfully',
            data: {
                id: game.id,
                name: game.name,
                releaseYear: format(game.releaseYear, "dd-MM-yyyy"),
                summary: game.summary,
            },
        };

        return res.status(successCode).json(response);

    } catch (error) {

        next(error);

    }
}