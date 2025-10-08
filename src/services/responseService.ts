import { List, ApplicationResponse, PaginationParams } from '../types/types';

/**
 * Calculate pagination parameters from page and limit values
 */
export const calculatePagination = (
    page: number = 1,
    limit: number = 10
): PaginationParams => ({
    page: Math.max(1, page),
    limit: Math.max(1, Math.min(limit, 50)), // Limit maximum items per page to 50
    skip: (Math.max(1, page) - 1) * Math.max(1, Math.min(limit, 50))
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