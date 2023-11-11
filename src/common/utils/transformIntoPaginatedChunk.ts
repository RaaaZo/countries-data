export const transformIntoPaginatedChunk = <T>(
  array: T[],
  page: number,
  limit: number,
) => {
  const totalItems = array.length;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(totalItems / limit);
  const hasMore = page < totalPages;

  const paginatedData = array.slice(offset, offset + limit);

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
