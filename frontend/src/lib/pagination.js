export function getPaginationData(url, itemsPerPage = 4) {
  const searchParams = new URL(url).searchParams;
  const currentPage = parseInt(searchParams.get('page')) || 1;
  
  return {
    currentPage,
    itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage
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