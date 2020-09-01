import React from 'react'
import "./pagination.styles.css";
import ReactPaginate from "react-paginate"
const Pagination = ({currentPage, numPages, handlePageClick}) => {
  return (
    <ReactPaginate
    previousLabel="&#10094;"
    nextLabel="&#10095;"
    marginPagesDisplayed={2}
    breakLabel={"..."}
    breakClassName="Pagination-break"
    pageCount={numPages}    
    initialPage={currentPage-1}      
    pageRangeDisplayed={5}
    onPageChange={handlePageClick}
    pageLinkClassName={"pagination-link"}
    pageClassName={"pagination-item"}        
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
    previousLinkClassName={"pagination-margin"}
    nextLinkClassName={"pagination-margin"}
    activeLinkClassName={"active-link"}
  />
  )
}

export default Pagination
