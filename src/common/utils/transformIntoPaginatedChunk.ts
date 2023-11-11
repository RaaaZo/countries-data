export const transformIntoPaginatedChunk = <T>(
  array: T[],
  page: number,
  limit: number,
) => {
  const totalItems = array.length;
  const offset = (Number(page) - 1) * Number(limit);
  const totalPages = Math.ceil(totalItems / Number(limit));
  const hasMore = Number(page) < totalPages;

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
