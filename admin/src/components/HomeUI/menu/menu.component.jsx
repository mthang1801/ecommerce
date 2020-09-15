import React, {useEffect, useState} from 'react'
import {
  getMenu,
  createMenu,
  updateManufactor
} from "../../../utils/connectDB";
import {JSONData, MenuWrapper} from "./menu.styles";
import Button from '@material-ui/core/Button';
const Menu = ({match}) => {
  console.log(match);
  const [menuList, setMenuList] = useState(null);
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    getMenu().then(data => {      
      console.log(data);
      setMenuList(JSON.stringify(data));
    });
  }, [getMenu]);

  const handleCreateMenuFile = e => {
   
    createMenu(menuList).then(res => {
     
      setAlert("Tạo file thành công");
    }).catch(err => {
      setAlert("Tạo file thất bại");
    });
  } 
  return (  
    <MenuWrapper>    
      {alert && <h2>{alert}</h2>}
      <JSONData>
        {menuList}  
      </JSONData>
      {menuList && <Button variant="contained" color="primary" onClick={handleCreateMenuFile} style={{marginLeft : "auto", display : "block"}}>
        Tạo file
      </Button>}     
    </MenuWrapper>  
        
  )
}

export default Menu
