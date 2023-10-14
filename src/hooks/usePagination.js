import { useState } from 'react';

const usePagination = (initialPage, itemsPerPage, items) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    currentPage,
    currentItems,
    totalPages,
    paginate,
  };
};

export default usePagination;
