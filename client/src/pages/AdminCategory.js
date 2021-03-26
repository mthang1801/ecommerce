import React, { useState, useEffect } from "react";
import AdminLayout from "../containers/AdminLayout";
import useLanguage from "../components/Global/useLanguage";
import AdminNavigations from "../components/Admin/AdminNavigations";
import AdminHome from "../components/Admin/AdminHome";
import AdminAdd from "../components/Admin/AdminAdd";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAdminCategoriesList,
  selectAdminCategoriesCount,
  selectAdminCategoriesLoading
} from "../redux/admin-category/admin-category.selectors";
import {
  addAdminCategory,
  fetchAdminCategories,
  editAdminCategories ,
  removeAdminCategory
} from "../redux/admin-category/admin-category.actions";
const AdminCategory = ({
  adminCategoriesList,
  adminCategoriesCount,
  fetchAdminCategories,
  isLoading,
  onAdd,
  onEdit,
  onRemove
}) => {
  const cols = ["name", "slug", "portfolio", "createdAt"];
  const { i18n, lang } = useLanguage();
  const [navigation, setNavigation] = useState("home");
  const { categoryNavigations } = i18n.store.data[
    lang
  ].translation.adminNavigations;
  const { category } = i18n.store.data[lang].translation.admin;

  useEffect(() => {
    fetchAdminCategories(0, +process.env.REACT_APP_ADMIN_CATEGORIES_PER_LOAD);
  }, []);
 
  return (
    <AdminLayout>
      <AdminNavigations
        navigation={navigation}
        setNavigation={(val) => setNavigation(val)}
        dataNavigations={categoryNavigations}
      />
      {navigation === "home" && (
        <AdminHome
          isLoading={isLoading}
          listData={adminCategoriesList}
          count={adminCategoriesCount}
          role="category"
          cols={cols}
          localesData={category} 
          onEdit={onEdit}
          onRemove={onRemove}
        />
      )}
      {navigation === "add-category" && (
        <AdminAdd onAdd={onAdd} localesData={category} role="category" />
      )}
    </AdminLayout>
  );
};
const mapStateToProps = createStructuredSelector({
  adminCategoriesList: selectAdminCategoriesList,
  adminCategoriesCount: selectAdminCategoriesCount,
  isLoading : selectAdminCategoriesLoading
});
const mapDispatchToProps = (dispatch) => ({
  fetchAdminCategories: (skip, limit) =>
    dispatch(fetchAdminCategories(skip, limit)),
  onAdd: (category) => dispatch(addAdminCategory(category)),
  onEdit : category => dispatch(editAdminCategories(category)),
  onRemove : _id => dispatch(removeAdminCategory(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory);
