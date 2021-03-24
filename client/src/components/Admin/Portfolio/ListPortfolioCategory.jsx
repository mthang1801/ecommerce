import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Row,
  Data,
  Button,
  BtnText,
} from "../../Custom/styles/CustomTable.styles";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { removeAdminPortfolio } from "../../../redux/admin-portfolio/admin-portfolio.actions";
import { connect } from "react-redux";
import EditForm from "./EditForm";

const ListTableCategory = ({ data, removeAdminPortfolio, isLoading }) => {
  const [collapsed, setCollapsed] = useState([]);
  const [colNum, setColNum] = useState(0);
  const [edit, setEdit] = useState({});
  const [cols, setCols] = useState(["_id", "name", "linkUrl", "createdAt"]); 
  const close = (position) => {
    if (collapsed.includes(position)) {
      return true;
    }
    return false;
  };
  const handleToggle = (pos) => {
    let findIdx = collapsed.findIndex((idx) => idx === pos);
    if (findIdx > -1) {
      setCollapsed((prevState) => prevState.filter((idx) => idx !== pos));
      setColNum((prevState) => prevState + 1);
    } else {
      setCollapsed((prevState) => [...prevState, pos]);
      setColNum((prevState) => prevState - 1);
    }
  };
  if(!data) return null;
  if(isLoading) return <h4>Loading...</h4>
  if (data.length) {
    return (
      <React.Fragment>
        <Table>
          <Thead>
            <Row number={colNum}>
              {cols.map((col, idx) => (
                <Data close={close(idx)}>
                  <span>{col}</span>
                  {close(idx) ? (
                    <BtnText onClick={() => handleToggle(idx)}>&#10095;</BtnText>
                  ) : (
                    <BtnText onClick={() => handleToggle(idx)}>&#10094;</BtnText>
                  )}
                </Data>
              ))}
              <Data>{close(cols.length) ? (
                    <BtnText onClick={() => handleToggle(cols.length)}>&#10095;</BtnText>
                  ) : (
                    <BtnText onClick={() => handleToggle(cols.length)}>&#10094;</BtnText>
                  )}</Data>
            </Row>
          </Thead>
          <Tbody>
            {data.map((portfolio) => (
              <Row key={portfolio._id} number={colNum}>
                {cols.map((col, idx) => (
                  <Data close={close(idx)} tbody title={portfolio[col]}>
                    {col === "imageUrl" ? (
                      <a
                        href={`/images/${portfolio[col]}`}
                        style={{ color: "blue" }}
                        target="_blank"
                      >
                        {portfolio[col]}
                      </a>
                    ) : (
                      portfolio[col]
                    )}
                  </Data>
                ))}
                <Data
                  close={close(cols.length)}
                  tbody
                  style={{ textAlign: "center" }}
                >
                  <Button color="#fbc531" onClick={() => setEdit(portfolio)}>
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => removeAdminPortfolio(portfolio._id)}
                    color="#dd2222"
                  >
                    <FaTrash />
                  </Button>
                </Data>
              </Row>
            ))}
          </Tbody>
        </Table>
        <EditForm edit={edit} setEdit={setEdit} />
      </React.Fragment>
    );
  }
  return null;
};
const mapDispatchToProps = (dispatch) => ({
  removeAdminPortfolio: (porfolioId) => dispatch(removeAdminPortfolio(porfolioId)),
});
export default connect(null, mapDispatchToProps)(ListTableCategory);
