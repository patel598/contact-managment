// import Pagination from 'react-bootstrap/Pagination';

// function PaginationComponent() {
//   return (
//     <Pagination>
//       <Pagination.First />
//       <Pagination.Prev />
//       <Pagination.Item>{1}</Pagination.Item>
//       <Pagination.Ellipsis />

//       <Pagination.Item>{5}</Pagination.Item>
//       <Pagination.Item>{6}</Pagination.Item>
//       <Pagination.Item active>{7}</Pagination.Item>
//       <Pagination.Item>{8}</Pagination.Item>
//       <Pagination.Item disabled>{9}</Pagination.Item>

//       <Pagination.Ellipsis />
//       <Pagination.Item>{15}</Pagination.Item>
//       <Pagination.Next />
//       <Pagination.Last />
//     </Pagination>
//   );
// }

// export default PaginationComponent;



import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // Show maximum 5 pages at a time (2 before + current + 2 after)
  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    
    // Adjust if near start/end
    if (currentPage <= 3) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) start = Math.max(totalPages - 4, 1);
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <Pagination className="justify-content-center mt-3">
      <Pagination.First 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
      />
      <Pagination.Prev 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      />

      {currentPage > 3 && totalPages > 5 && (
        <>
          <Pagination.Item onClick={() => onPageChange(1)}>
            1
          </Pagination.Item>
          <Pagination.Ellipsis disabled />
        </>
      )}

      {getVisiblePages().map(page => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <Pagination.Ellipsis disabled />
          <Pagination.Item onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Pagination.Item>
        </>
      )}

      <Pagination.Next 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      />
      <Pagination.Last 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
