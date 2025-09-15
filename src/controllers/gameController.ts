import { Request, Response, NextFunction  } from 'express';
import { List, Game, ApplicationResponse } from '../types/types';
import prismaClient from '../config/prismaConfig';

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Page information
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Execute async query to mongo db, not include weapons only the games
        const [items, count] = await Promise.all([
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

            res.status(201).json(response);
            return;
        }

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

        res.json(response);

    } catch (error) {

        next(error);
    }
}