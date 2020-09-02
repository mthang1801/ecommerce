import React , {useState, useEffect} from "react";
import { LeftSideMenuWrapper, Title, ReadMore } from "./left-side-menu.styles";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
const LeftSideMenu = ({ title, list }) => {
  const [shortList, setShortList] = useState([]);
  const [showReadMore, setShowReadMore] = useState(false);
  useEffect(() => {       
    if(list.length > 9 )    {
      setShortList(list.filter((_,idx) => idx < 9).map(item => item));
      setShowReadMore(true);
    }
  }, [list])

  const handleClickReadMore = () => {    
    if(showReadMore){
      setShortList([...list]);
      setShowReadMore(false);
    }else{
      setShortList(list.filter((_,idx) => idx < 9).map(item => item));
      setShowReadMore(true);
    }
   
  }
  return (
    <LeftSideMenuWrapper>
      <Title>{title}</Title>
      {list && list.length < 9 ?
        list.map((listItem) => (
          <CustomLink
            key={listItem._id}
            to={listItem.linkUrl}
            style={{
              fontWeight: "normal",
              textTransform: "capitalize",
            }}
          >
            {listItem.name} <span style={{ color: "#757575", fontSize: "0.8em" }}>({listItem.products.length})</span>
          </CustomLink>
        )) : (
          <React.Fragment>
            {shortList.map((listItem) => (
              <CustomLink
                key={listItem._id}
                to={listItem.linkUrl}
                style={{
                  fontWeight: "normal",
                  textTransform: "capitalize",
                }}
              >
                {listItem.name} <span style={{ color: "#757575", fontSize: "0.8em" }}>({listItem.products.length})</span>
              </CustomLink>))}
              <ReadMore onClick={handleClickReadMore}>{showReadMore ? "Xem thêm" :  "Thu gọn" } </ReadMore>
          </React.Fragment>
        )}
    </LeftSideMenuWrapper>
  );
};

export default LeftSideMenu;
