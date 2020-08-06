import React from "react";
import { PaginationContainer, PageLink } from "./pagination.styles";
const Pagination = () => {
  return (
    <PaginationContainer>
      <PageLink to="/?page=1">
        1
      </PageLink>
      <PageLink to="/?page=2">2</PageLink>
      <PageLink to="/?page=3">3</PageLink>
      <PageLink to="/?page=4">4</PageLink>
      <PageLink to="/?page=5">Next</PageLink>
    </PaginationContainer>
  );
};

export default Pagination;
