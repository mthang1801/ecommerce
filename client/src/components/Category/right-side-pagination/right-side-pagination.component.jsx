import React, { useState, useEffect } from "react";
import { PaginationContainer, PageLink } from "./right-side-pagination.styles";
import { withRouter } from "react-router-dom";
import { setCurrentPage } from "../../../redux/category/category.actions";
import { connect } from "react-redux";
import { generatePagination, listNextExtends, listPrevExtends } from "../../../utils/algorithms"
import ReactPaginate from "react-paginate"
const Pagination = ({
  currentPage,
  numPages,
  match,
  history,
  location,
  setCurrentPage,
}) => {  

  const movePage = page => {
    const pathName = location.pathname.split("/")[1];
    history.push(`/${pathName}/products?page=${page}`);
    setCurrentPage(page);
  }
  const handlePageClick = (data) => {    
    const currentPage = data.selected +1 ; 
    movePage(currentPage);
  };
 
  return (
    <PaginationContainer>     
      <ReactPaginate
        previousLabel="&#10094;"
        nextLabel="&#10095;"
        marginPagesDisplayed={2}
        breakLabel={"..."}
        breakClassName="pagination-break"
        pageCount={numPages}
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
    </PaginationContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentPage : page => dispatch(setCurrentPage(page))
})
export default connect(null, mapDispatchToProps)(withRouter(Pagination));
