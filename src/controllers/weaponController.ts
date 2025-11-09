import { Request, Response, NextFunction } from 'express';
import { Weapon, FilterParams } from '../types/types';
import prismaClient from '../config/prismaConfig';
import { successCode, noContentCode, badRequestCode, notFoundCode } from '../utils/codes';
import {
    calculatePagination,
    createPaginatedResponse,
    createErrorResponse,
    createSuccessResponse,
    formatterFilters
} from '../services/responseService';
import { Prisma } from '@prisma/client';

/**
 * Format a weapon from database to API response format
 */
const formatWeapon = (weapon: any): Weapon => ({
    id: weapon.id,
    name: weapon.name,
    description: weapon.description,
    archives: weapon.archives,
    maxLevel: weapon.maxLevel,
    movements: weapon.movements.map(movement => ({
        name: movement.name,
        unlockLevel: movement.unlockLevel,
        combination: movement.combination
    }))
});

/* 
 * Management filters from prisma
 */
const buildWeaponWhereAndClause = (filters: FilterParams): Prisma.WeaponWhereInput[] => {

    const andClause: Prisma.WeaponWhereInput[] = [ { maxLevel: { gte: filters.levelRankMin, lte: filters.levelRankMax } } ];

    if ( filters.searchCharacters !== '' ) {
        andClause.push(
            { name: { contains: filters.searchCharacters } },
            { description: { contains: filters.searchCharacters } }
        );
    }

    if ( filters.game !== 'all' ) {
        andClause.push(
            { gameId: filters.game }
        );
    }

    return andClause;
}; 

/**
 * Fetch weapons from database with pagination
 */
const fetchPaginatedWeapons = async ({ skip, limit }: { skip: number, limit: number }, filters: FilterParams) => {

    const andClause = buildWeaponWhereAndClause( filters );

    return Promise.all([
        prismaClient.weapon.findMany({
            skip,
            take: limit,
            where: {
                AND: andClause,
            },
            include: { movements: true },
            orderBy: { name: 'desc' },
        }),
        prismaClient.weapon.count({
            where: {
                AND: andClause,
            }
        })
    ]);
};

/**
 * Get all weapons with pagination
 */
export const getAllWeapons = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pagination = calculatePagination(
            Number(req.query.page),
            Number(req.query.limit)
        );

        const filters = formatterFilters(
            String(req.query.searchCharacters),
            String(req.query.game),
            Number(req.query.levelRankMin),
            Number(req.query.levelRankMax)
        );

        const [weapons, totalCount] = await fetchPaginatedWeapons(pagination, filters);

        if (totalCount === 0) {
            return res.status(noContentCode).json(
                createErrorResponse('No weapons found in the database', true)
            );
        }

        const formattedWeapons = weapons.map(formatWeapon);
        const response = createPaginatedResponse(
            formattedWeapons,
            totalCount,
            pagination.page,
            pagination.limit,
            'Weapons fetched successfully'
        );

        return res.status(successCode).json(response);

    } catch (error) {

        next(error);

    }
};

/**
 * Get a single weapon by ID
 */
export const getWeapon = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(badRequestCode).json(
                createErrorResponse('Weapon ID is required')
            );
        }

        const weapon = await prismaClient.weapon.findFirst({
            where: { id },
            include: { movements: true }
        });

        if (!weapon) {
            return res.status(notFoundCode).json(
                createErrorResponse('Weapon not found')
            );
        }

        const formattedWeapon = formatWeapon(weapon);
        const response = createSuccessResponse(
            formattedWeapon,
            'Weapon fetched successfully'
        );

        return res.status(successCode).json(response);

    } catch (error) {

        next(error);

    }
}