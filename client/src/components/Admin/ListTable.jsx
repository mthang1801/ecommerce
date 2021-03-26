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
    
  const [edit, setEdit] = useState({});
    
  if(!data) return null;
  if(isLoading) return <h4>Loading...</h4>
  if (data.length) {
    return (
      <React.Fragment>
        <Table>
          <Thead>
            <Row>
              {cols.map((col, idx) => (
                <Data flex={col === "portfolio" ? "2 0 25%" :"1 0 20%" }>
                  <span>{col}</span>                  
                </Data>
              ))}
              <Data><span>actions</span></Data>
            </Row>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Row key={item._id}  >
                {cols.map((col, idx) => (
                  <Data tbody title={item[col].name} flex={col === "portfolio" ? 3 :1 }>
                    {col === "portfolio" ? item[col].name : col === "createdAt" ? (
                      <Moment format="DD/MM/YYYY">
                        {item[col]}
                      </Moment>
                    ) : (
                      item[col]
                    )}
                  </Data>
                ))}
                <Data                  
                  tbody
                  style={{ textAlign: "center" }}
                >
                  <Button color="#fbc531" onClick={() => setEdit(item)}>
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => onRemove(item._id)}
                    color="#dd2222"
                  >
                    <FaTrash />
                  </Button>
                </Data>
              </Row>
            ))}
          </Tbody>
        </Table>
        <EditForm edit={edit} setEdit={setEdit} onEdit={onEdit} role={role} localesData={localesData} />
      </React.Fragment>
    );
  }
  return null;
};

export default ListTable;
