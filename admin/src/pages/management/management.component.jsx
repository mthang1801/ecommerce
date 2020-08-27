import React from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "../../components/Layout/navigation/navigation.component";
import Category from "../category-management/category-management.component";
import  ProductTypes from "../product-types-management/product-types-management.component";
import Dashboard from "../management-dashboard/management-dashboard.component";
import { ManagementPageWrapper, ContentDisplay } from "./management.styles";
import ManagementHomeUI from "../management-home-ui/management-home-ui.component";
const ManagementPage = ({ match }) => {  
  return (
    <ManagementPageWrapper>
      <Navigation />
      <ContentDisplay>
        <Switch>
          <Route path={`${match.path}`} exact component={Dashboard}/>
          <Route path={`${match.path}/category`} component={Category} />
          <Route
            path={`${match.path}/product-types`}
            component={ProductTypes}
          />        
          <Route path={`${match.path}/home-ui`} component={ManagementHomeUI}/>
        </Switch>
      </ContentDisplay>
    </ManagementPageWrapper>
  );
};

export default ManagementPage;
