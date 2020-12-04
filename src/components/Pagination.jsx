import React from "react";
import { MemoryRouter, Route } from "react-router";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

export default function PaginationLink(props) {
  const { id, totalPokemons } = props;
  return (
    <Pagination
      //   boundaryCount={10}
      siblingCount={2}
      page={parseInt(id)}
      count={totalPokemons}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/pokemon/${item.page}`}
          {...item}
        />
      )}
    />
  );
}
