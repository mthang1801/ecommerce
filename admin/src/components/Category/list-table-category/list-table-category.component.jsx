import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Row,
  Data,
  Button,
  BtnText,
} from "../../UI/custom-table/custom-table.styles";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { removeCategory } from "../../../redux/category/category.actions";
import { connect } from "react-redux";
import EditForm from "../edit-form/edit-form.component";

const ListTableCategory = ({ data, removeCategory }) => {
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
            {data.map((category) => (
              <Row key={category._id} number={colNum}>
                {cols.map((col, idx) => (
                  <Data close={close(idx)} tbody title={category[col]}>
                    {col === "imageUrl" ? (
                      <a
                        href={`http://localhost:5000/images/${category[col]}`}
                        style={{ color: "blue" }}
                        target="_blank"
                      >
                        {category[col]}
                      </a>
                    ) : (
                      category[col]
                    )}
                  </Data>
                ))}
                <Data
                  close={close(cols.length)}
                  tbody
                  style={{ textAlign: "center" }}
                >
                  <Button color="#fbc531" onClick={() => setEdit(category)}>
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => removeCategory(category._id)}
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
  removeCategory: (categoryId) => dispatch(removeCategory(categoryId)),
});
export default connect(null, mapDispatchToProps)(ListTableCategory);
