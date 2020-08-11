import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Row,
  Data,
  Button,
  Toggle,
} from "../../UI/custom-table/custom-table.styles";
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
const ListTableCategory = ({ data }) => {  
  const [collapsed, setCollapsed] = useState([]);
  const [colNum, setColNum] = useState(6);  
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

  return (
    <Table>
      <Thead>
        <Row number={colNum}>
          <Data close={close(1)}>
            <span>Id</span>{" "}
            {close(1) ? (
              <Toggle onClick={() => handleToggle(1)}>&#10095;</Toggle>
            ) : (
              <Toggle onClick={() => handleToggle(1)}>&#10094;</Toggle>
            )}{" "}
          </Data>
          <Data close={close(2)}>
            Name{" "}
            {close(2) ? (
              <Toggle onClick={() => handleToggle(2)}>&#10095;</Toggle>
            ) : (
              <Toggle onClick={() => handleToggle(2)}>&#10094;</Toggle>
            )}
          </Data>
          <Data close={close(3)}>
            linkUrl{" "}
            {close(3) ? (
              <Toggle onClick={() => handleToggle(3)}>&#10095;</Toggle>
            ) : (
              <Toggle onClick={() => handleToggle(3)}>&#10094;</Toggle>
            )}
          </Data>
          <Data close={close(4)}>
            ImageUrl{" "}
            {close(4) ? (
              <Toggle onClick={() => handleToggle(4)}>&#10095;</Toggle>
            ) : (
              <Toggle onClick={() => handleToggle(4)}>&#10094;</Toggle>
            )}
          </Data>
          <Data close={close(5)}>
            Created At{" "}
            {close(5) ? (
              <Toggle onClick={() => handleToggle(5)}>&#10095;</Toggle>
            ) : (
              <Toggle onClick={() => handleToggle(5)}>&#10094;</Toggle>
            )}
          </Data>
          <Data close={close(6)}>
            {" "}
            {close(6) ? (
              <Toggle onClick={() => handleToggle(6)}>&#10095;</Toggle>
            ) : (
              <Toggle onClick={() => handleToggle(6)}>&#10094;</Toggle>
            )}
          </Data>
        </Row>
      </Thead>
      <Tbody>
        {data.map((category) => (
          <Row key={category._id} number={colNum}>
            <Data close={close(1)} tbody title={category._id}>
              {category._id}
            </Data>
            <Data close={close(2)} tbody title={category.name}>
              {category.name}
            </Data>
            <Data close={close(3)} tbody title={category.linkUrl}>
              {category.linkUrl}
            </Data>
            <Data close={close(4)} tbody title={category.imageUrl}>
              <a
                href={`http://localhost:5000/images/${category.imageUrl}`}
                style={{ color: "blue" }}
                target="_blank"
              >
                {category.imageUrl}
              </a>
            </Data>
            <Data close={close(5)} tbody title={category.createdAt}>
              {category.createdAt}
            </Data>
            <Data close={close(6)} tbody style={{ textAlign: "center" }}>
              <Button color="#fbc531">
                <FaEdit />
              </Button>
              <Button color="#dd2222">
                <FaTrash />
              </Button>
            </Data>
          </Row>
        ))}
      </Tbody>
    </Table>
  );
};

export default ListTableCategory;
