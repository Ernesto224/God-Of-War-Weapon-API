import { Request, Response, NextFunction } from 'express';
import { List, Weapon, ApplicationResponse } from '../types/types';
import prismaClient from '../config/prismaConfig';
import { successCode, noContentCode, badRequestCode, notFoundCode } from '../utils/codes';

export const getAllWeapons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Page information
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Execute async query to database
        const [dataBaseItems, count] = await Promise.all([
            prismaClient.weapon.findMany({
                skip,
                take: limit,
                include: {
                    movements: true
                },
                orderBy: {
                    name: 'asc'
                }
            }),
            prismaClient.weapon.count()
        ]);

        // If no weapons found, return empty array
        if (count == 0) {

            const response: ApplicationResponse = {
                success: true,
                message: 'Games fetched failed, not game exists'
            };

            return res.status(noContentCode).json(response);
        }

        // Map database items to ensure correct structure
        const items = dataBaseItems.map( weapon => ({
            id: weapon.id,
            name: weapon.name,
            description: weapon.description,
            archives: weapon.archives,
            maxLevel: weapon.maxLevel,
            movements: weapon.movements.map(movement => ({
                unlockLevel: movement.unlockLevel,
                combination: movement.combination
            }))
        }));

        // Calculate total pages
        const pages = Math.ceil(count / limit);

        // Format response
        const response: ApplicationResponse<List<Weapon>> = {
            success: true,
            message: 'Weapons fetched successfully',
            data: {
                count,
                pages,
                page,
                items
            }
        };

        return res.status(successCode).json(response);

    } catch (error) {

        next(error);

    }
};

export const getWeapon = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Verify existing id in the request params
        if (!req.params.id) {

            const response: ApplicationResponse = {
                success: false,
                message: 'Game id is required'
            };

            return res.status(badRequestCode).json(response);
        }

        const requestId: string = req.params.id;

        // Execute async query to mongo db, include movements
        const weapon = await prismaClient.weapon.findFirst(
            {
                where: {
                    id: requestId
                },
                include: {
                    movements: true
                }
            }
        );

        if (!weapon) {

            const response: ApplicationResponse = {
                success: false,
                message: 'Weapon fetched failed, not weapon exists'
            };

            return res.status(notFoundCode).json(response);
        }

        // Map weapon to ensure correct structure
        const data = {
            id: weapon.id,
            name: weapon.name,
            description: weapon.description,
            archives: weapon.archives,
            maxLevel: weapon.maxLevel,
            movements: weapon.movements.map(movement => ({
                unlockLevel: movement.unlockLevel,
                combination: movement.combination
            }))
        };

        const response: ApplicationResponse<Weapon> = {
            success: true,
            message: 'Weapon fetched successfully',
            data
        };

        return res.status(successCode).json(response);

    } catch (error) {

        next(error);
        
    }
}