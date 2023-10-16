import { useState } from 'react';

const usePagination = (initialPage: number, itemsPerPage: number, items: Array<Post>) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    currentPage,
    currentItems,
    totalPages,
    paginate,
  };
};

export default usePagination;
