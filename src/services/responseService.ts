import { List, ApplicationResponse, PaginationParams, FilterParams } from '../types/types';

/**
 * Calculate pagination parameters from page and limit values
 */
export const calculatePagination = (
    page: number = 1,
    limit: number = 10
): PaginationParams => ({
    page: Math.max(1, page || 1),
    limit: Math.max(1, Math.min(limit || 10, 50)), // Limit maximum items per page to 50
    skip: (Math.max(1, page || 1) - 1) * Math.max(1, Math.min(limit || 10, 50))
});

/**
 * Extrac filter parameters
 */
export const formatterFilters = (
    searchCharacters: string = '',
    game: string = 'all',
    levelRankMin: number = 1,
    levelRankMax: number = 100
): FilterParams => ({
    searchCharacters: searchCharacters != 'undefined' ? searchCharacters : '',
    game: game != 'undefined' ? game : 'all',
    levelRankMin: Math.max(1, levelRankMin || 1),
    levelRankMax: Math.max(1, Math.min(levelRankMax || 100, 100))
});

/**
 * Create a paginated response with the given data
 */
export const createPaginatedResponse = <T>(
    items: T[],
    totalCount: number,
    page: number,
    limit: number,
    successMessage: string
): ApplicationResponse<List<T>> => ({
    success: true,
    message: successMessage,
    data: {
        count: totalCount,
        pages: Math.ceil(totalCount / limit),
        page,
        items
    }
});

/**
 * Create an error response
 */
export const createErrorResponse = (
    message: string,
    success: boolean = false
): ApplicationResponse => ({
    success,
    message
});

/**
 * Create a success response with data
 */
export const createSuccessResponse = <T>(
    data: T,
    message: string
): ApplicationResponse<T> => ({
    success: true,
    message,
    data
});