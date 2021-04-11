import React, { useEffect, useState } from "react";
import { Wrapper } from "./styles/AdminHome.styles";
import SearchForm from "../Search/AdminSearch";
import ListTable from "./ListTable";

const AdminHome = ({
  onSearch,
  listData,
  count,
  role,
  isLoading,
  cols,
  onRemove,
  onEdit,
  localesData,
  fetchAllData
}) => {
  const [searchValue, setSearchValue] = useState("");  
  const [touched, setTouched] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  useEffect(() => {
    let timer ; 
    if (searchValue && onSearch) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onSearch(searchValue);
      },200)      
    }else{
      if(fetchAllData && touched ){       
        fetchAllData(0, +process.env.REACT_APP_ADMIN_PRODUCT_GROUPS_PER_LOAD)
        }      
    }

    return () => clearTimeout(timer);
  }, [searchValue,fetchAllData, touched]);


  useEffect(() => {
    let isScrolling  ; 
    function trackUserScroll(e){
      clearTimeout(isScrolling);
      isScrolling = setTimeout(()=>{
        const {clientHeight, scrollHeight, scrollTop} = document.documentElement;
        if(clientHeight + scrollTop > 0.75 * scrollHeight){         
          setIsLoadMore(true);
        }
      },66)
    }
    window.addEventListener("scroll", trackUserScroll)
    return () => {
      setTimeout(isScrolling);
      window.removeEventListener("scroll", trackUserScroll);
    }
  })

  useEffect(()=>{    
    if(isLoadMore && fetchAllData && count > listData.length){         
      const skip = listData.length; 
      const limit = +process.env.REACT_APP_ADMIN_CATEGORIES_PER_LOAD; 
      console.log(skip, limit)
      fetchAllData(skip, limit).then(res => {
        console.log("loaded")
        setIsLoadMore(false);
      });
    }
  },[isLoadMore,fetchAllData])  
  return (
    <Wrapper>
      <SearchForm
        searchValue={searchValue}
        setSearchValue={(val) => {
          if(!touched){
            setTouched(true);
          }
          setSearchValue(val)
        }}
        
      />
      <ListTable
        count={count}
        role={role}
        data={listData}
        isLoading={isLoading}
        cols={cols}
        onRemove={onRemove}
        onEdit={onEdit}  
        localesData={localesData}      
      />
    </Wrapper>
  );
};

export default React.memo(AdminHome);
