import React, { useState, useEffect } from "react";
import AdminLayout from "../containers/AdminLayout";
import useLanguage from "../components/Global/useLanguage";
import AdminNavigations from "../components/Admin/AdminNavigations";
import AdminHome from "../components/Admin/AdminHome";
import GenerateManyData from "../components/Admin/GenerateManyData";
import AdminAdd from "../components/Admin/AdminAdd";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAdminProductGroupsList,
  selectAdminProductGroupsCount,
  selectAdminProductGroupsLoading,
} from "../redux/admin-product-group/admin-product-group.selectors";

import {
  addAdminProductGroup,
  fetchAdminProductGroups,
  editAdminProductGroups,
  removeAdminProductGroup,
  searchAdminProductGroups,
  generateManyProductGroups,
} from "../redux/admin-product-group/admin-product-group.actions";

const AdminCategory = ({
  adminProductGroupsList,
  adminProductGroupsCount,
  fetchAdminProductGroups,
  isLoading,
  onAdd,
  onEdit,
  onRemove,
  onSearch,
  onGenerate,
}) => {
  const cols = ["name", "slug", "active", "portfolio", "category", "createdAt"];
  const { i18n, lang } = useLanguage();
  const [navigation, setNavigation] = useState("home");
  const { productGroupsNavigations } = i18n.store.data[
    lang
  ].translation.adminNavigations;
  const { productGroups } = i18n.store.data[lang].translation.admin;

  useEffect(() => {
    fetchAdminProductGroups(
      0,
      +process.env.REACT_APP_ADMIN_CATEGORIES_PER_LOAD
    );
  }, []);
  console.log(adminProductGroupsList);
  return (
    <AdminLayout>
      <AdminNavigations
        navigation={navigation}
        setNavigation={(val) => setNavigation(val)}
        dataNavigations={productGroupsNavigations}
      />
      {navigation === "home" && (
        <AdminHome
          isLoading={isLoading}
          listData={adminProductGroupsList}
          count={adminProductGroupsCount}
          role="product-group"
          cols={cols}
          localesData={productGroups}
          onEdit={onEdit}
          onRemove={onRemove}
          onSearch={onSearch}
          fetchAllData={fetchAdminProductGroups}
        />
      )}
      {navigation === "add-product-group" && (
        <AdminAdd
          onAdd={onAdd}
          localesData={productGroups}
          role="product-group"
        />
      )}
      {navigation === "auto-generate-data" && (
        <GenerateManyData
          localesData={productGroups}
          role="product-group"
          onGenerate={onGenerate}
        />
      )}
    </AdminLayout>
  );
};
const mapStateToProps = createStructuredSelector({
  adminProductGroupsList: selectAdminProductGroupsList,
  adminProductGroupsCount: selectAdminProductGroupsCount,
  isLoading: selectAdminProductGroupsLoading,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAdminProductGroups: (skip, limit) =>
    dispatch(fetchAdminProductGroups(skip, limit)),
  onAdd: (productGroup) => dispatch(addAdminProductGroup(productGroup)),
  onEdit: (productGroup) => dispatch(editAdminProductGroups(productGroup)),
  onRemove: (_id) => dispatch(removeAdminProductGroup(_id)),
  onSearch: (search) => dispatch(searchAdminProductGroups(search)),
  onGenerate: (data) => dispatch(generateManyProductGroups(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory);
