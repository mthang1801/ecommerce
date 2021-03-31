import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Row,
  Data,
  Button,
  BtnText,
} from "../Custom/styles/CustomTable.styles";
import { FaEdit, FaTrash  } from "react-icons/fa";

import EditForm from "./EditForm";
import Moment from "react-moment"

const ListTable = ({ data, isLoading, count, role, cols , onRemove, onEdit, localesData}) => {
    console.log(cols)
  const [edit, setEdit] = useState({});
  
  if(!data) return null;  
  if (data.length) {
    return (
      <React.Fragment>
        {isLoading && <h4>Loading...</h4>}
        <Table>
          <Thead>
            <Row>
              {cols.map((col, idx) => (
                <Data
                  key={col}
                  style={{
                    width:
                      col === "portfolio" && col === "category"
                        ? "15%"
                        : col === "portfolio"
                        ? "30%"
                        : "15%",
                  }}
                >
                  <span>{col}</span>
                </Data>
              ))}
              <Data>
                <span>actions</span>
              </Data>
            </Row>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Row key={`${role}-${item._id}`}>
                {cols.map((col, idx) => (
                  <Data
                    tbody
                    title={item[col].name}
                    style={{
                      width:
                        col === "portfolio" && col === "category"
                          ? "15%"
                          : col === "portfolio"
                          ? "30%"
                          : "15%",
                    }}
                  >
                    {col === "portfolio" || col === "category" ? (
                      item[col].name
                    ) : col === "createdAt" ? (
                      <Moment format="DD/MM/YYYY">{item[col]}</Moment>
                    ) : (
                      item[col]
                    )}
                  </Data>
                ))}
                <Data tbody style={{ textAlign: "center" }}>
                  <Button color="#fbc531" onClick={() => setEdit(item)}>
                    <FaEdit />
                  </Button>
                  <Button onClick={() => onRemove(item._id)} color="#dd2222">
                    <FaTrash />
                  </Button>
                </Data>
              </Row>
            ))}
          </Tbody>
        </Table>
        <EditForm
          edit={edit}
          setEdit={setEdit}
          onEdit={onEdit}
          role={role}
          localesData={localesData}
        />
      </React.Fragment>
    );
  }
  return null;
};

export default ListTable;
