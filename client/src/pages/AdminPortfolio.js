import React, { useState, useEffect } from "react";
import AdminLayout from "../containers/AdminLayout";
import AdminNavigations from "../components/Admin/AdminNavigations";
import AdminHome from "../components/Admin/AdminHome";
import AddPortfolio from "../components/Admin/AdminAdd";
import { connect } from "react-redux";
import { fetchAdminPortfolioList } from "../redux/admin-portfolio/admin-portfolio.actions";
import useLanguage from "../components/Global/useLanguage";
import { createStructuredSelector } from "reselect";
import {
  selectAdminPortfolioList,
  selectLoadingAdminPortfolioList,
} from "../redux/admin-portfolio/admin-portfolio.selector";
import {
  searchAdminPortfolio,
  removeAdminPortfolio,
  editAdminPortfolio,
  addAdminPortfolio
} from "../redux/admin-portfolio/admin-portfolio.actions";
const AdminPortfolio = ({
  adminCategoryList,
  isLoading,
  onSearch,
  fetchAdminPortfolioList,
  onRemove,
  onEdit,
  onAdd 
}) => {
  const cols = ["name", "slug", "createdAt"];
  const [navigation, setNavigation] = useState("home");
  useEffect(() => {    
    fetchAdminPortfolioList();
  }, [fetchAdminPortfolioList]);
  const { i18n, lang } = useLanguage();  
  const {porfolio} = i18n.store.data[lang].translation.admin
  const { portfolioNavigations } = i18n.store.data[
    lang
  ].translation.adminNavigations;  
  return (
    <AdminLayout>
      <AdminNavigations
        navigation={navigation}
        setNavigation={(val) => setNavigation(val)}
        dataNavigations={portfolioNavigations}
      />
      {navigation === "home" && (
        <AdminHome
          listData={adminCategoryList}
          isLoading={isLoading}
          onSearch={onSearch}
          cols={cols}
          onRemove={onRemove}
          onEdit={onEdit}
          role="portfolio"
          fetchAllData={fetchAdminPortfolioList}
        />
      )}
      {navigation === "add-portfolio" && <AddPortfolio onAdd={onAdd} localesData={porfolio}/>}
    </AdminLayout>
  );
};
const mapStateToProps = createStructuredSelector({
  adminCategoryList: selectAdminPortfolioList,
  isLoading: selectLoadingAdminPortfolioList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAdminPortfolioList: () => dispatch(fetchAdminPortfolioList()),
  onSearch: (value) => dispatch(searchAdminPortfolio(value)),
  onRemove: (_id) => dispatch(removeAdminPortfolio(_id)),
  onEdit: (data) => dispatch(editAdminPortfolio(data)),
  onAdd : category => dispatch(addAdminPortfolio(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortfolio);
