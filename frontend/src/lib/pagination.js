export function getPaginationData(page, totalItems, itemsPerPage = 4) {
  const currentPage = parseInt(page) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    totalPages,
    offset,
    itemsPerPage
  };
}

export function generatePaginationLinks(currentPage, totalPages, baseUrl) {
  const url = new URL(baseUrl);
  
  const links = {
    prev: currentPage > 1 ? `${url.pathname}?page=${currentPage - 1}` : null,
    next: currentPage < totalPages ? `${url.pathname}?page=${currentPage + 1}` : null
  };
  
  return links;
} 