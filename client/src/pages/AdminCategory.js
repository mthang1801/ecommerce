import React, {useState, useEffect} from 'react'
import AdminLayout from "../containers/AdminLayout"
import AdminCategoryNavigations from "../components/Admin/Portfolio/AdminPortfolioNavigations"
import AdminPortfolioHome from "../components/Admin/Portfolio/AdminPortfolioHome"
import AddPortfolio from "../components/Admin/Portfolio/AddPorfolio"
import {connect} from "react-redux";
import {fetchAdminPortfolioList} from "../redux/admin-portfolio/admin-portfolio.actions";
const AdminCategory = ({fetchAdminPortfolioList}) => {
  const [navigation, setNavigation] = useState("home");
  useEffect( () => {    
    fetchAdminPortfolioList()    
  } ,[fetchAdminPortfolioList])
  return (
    <AdminLayout>
      <AdminCategoryNavigations navigation={navigation} setNavigation={val => setNavigation(val)}/>
      {navigation === "home" && <AdminPortfolioHome/>}
      {navigation === "add-portfolio" && <AddPortfolio/>}
    </AdminLayout>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchAdminPortfolioList : () => dispatch(fetchAdminPortfolioList())
})

export default connect(null, mapDispatchToProps)(AdminCategory)
