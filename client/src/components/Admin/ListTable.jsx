import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import EditForm from "./EditForm";
import Moment from "react-moment";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {},
});

const ListTable = ({
  data,
  isLoading,
  count,
  role,
  cols,
  onRemove,
  onEdit,
  localesData,
}) => {
  const classes = useStyles();
  const [edit, setEdit] = useState({});

  if (!data) return null;
  if (data.length) {
    return (
      <div style={{ padding: "1rem 2rem" }}>
        {isLoading && <h4>Loading...</h4>}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                {cols.map((col, idx) => (
                  <StyledTableCell
                    align={idx !== 0 ? "right" : "left"}
                    key={col}
                  >
                    {col}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="right">Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <StyledTableRow key={`${role}-${item._id}`}>
                  {cols.map((col, idx) => (
                    <StyledTableCell
                      align={idx !== 0 ? "right" : "left"}
                      key={`${
                        col === "portfolio" || col === "category"
                          ? item[col]._id
                          : item[col]
                      }-${idx}`}
                    >
                      {col === "portfolio" || col === "category" ? (
                        <span title={item[col].name}>{item[col].name}</span>
                      ) : col === "createdAt" ? (
                        <Moment format="DD/MM/YYYY">{item[col]}</Moment>
                      ) : (
                        <span title={item[col]}>{item[col]}</span>
                      )}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="right">
                    <Button
                      style={{
                        color: "#ffab00",
                        fontWeight: "bolder",
                        fontSize: "0.8rem",
                      }}
                      onClick={() => setEdit(item)}
                    >
                      EDIT
                    </Button>
                    <Button
                      style={{
                        color: "#d32f2f",
                        fontWeight: "bolder",
                        fontSize: "0.8rem",
                      }}
                      onClick={() => onRemove(item._id)}
                    >
                      DELETE
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EditForm
          edit={edit}
          setEdit={setEdit}
          onEdit={onEdit}
          role={role}
          localesData={localesData}
        />
      </div>
    );
  }
  return null;
};

export default ListTable;
