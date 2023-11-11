import { BadRequestException } from '@nestjs/common';

export const transformIntoPaginatedChunk = <T>(
  array: T[],
  page: number,
  limit: number,
) => {
  const totalItems = array.length;
  const offset = (Number(page) - 1) * Number(limit);
  const totalPages = Math.ceil(totalItems / Number(limit));
  const hasMore = Number(page) < totalPages;

  const isPaginationValid = totalPages >= page && page > 0;

  if (!isPaginationValid)
    return new BadRequestException(
      'Pagination params are not valid. Check if page and limit are correct.',
    );

  const paginatedData = array.slice(offset, offset + Number(limit));

  return {
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasMore,
    },
    data: paginatedData,
  };
};
