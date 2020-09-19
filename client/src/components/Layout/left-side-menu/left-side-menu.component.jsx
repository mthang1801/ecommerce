import React , {useState, useEffect} from "react";
import { LeftSideMenuWrapper, Title, ReadMore } from "./left-side-menu.styles";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
const LeftSideMenu = ({ title, list }) => {
  const [shortList, setShortList] = useState([]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [readMore, setReadMore] = useState(false);
  useEffect(() => {       
    if(list.length > 5 )    {
      setShortList(list.filter((_,idx) => idx < 5).map(item => item));
      setShowReadMore(true);
    }else{
      setShortList(list.map(item => item));
      setShowReadMore(false);
    }
  }, [list])

  const handleClickReadMore = () => {    
    if(readMore){      
      setShortList(list.filter((_,idx) => idx < 5).map(item => item));
      setReadMore(false);
    }else{
      setShortList([...list]);
      setReadMore(true);
    }
   
  }
  return (
    <LeftSideMenuWrapper>
      <Title>{title}</Title>
      
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
              {showReadMore ? <ReadMore onClick={handleClickReadMore}>{!readMore ? "Xem thêm" :  "Thu gọn" } </ReadMore> : null}
          </React.Fragment>
        
    </LeftSideMenuWrapper>
  );
};

export default LeftSideMenu;
