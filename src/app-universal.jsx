import React from "react";

import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Header from "./components/header/index";
import Dashboard from "./components/dashboard";
import Appointments from "./components/appointments";
import Specialities from "./components/specialities";
import Doctors from "./components/doctors";
import Patients from "./components/patients";
import Clinics from "./components/clinics";
import KeywordSearch from "./components/keywordSearch";
import Reviews from "./components/reviews";
import Transaction from "./components/transaction";
import Settings from "./components/settings";
import InvoiceReport from "./components/invoicereport";
import Invoice from "./components/invoicereport/invoice";
import ProductList from "./components/productlist";
import PharmacyList from "./components/pharmacylist";
import Blog from "./components/update/blog";
import BlogDetails from "./components/update/blogdetails";
import AddBlog from "./components/update/addblog";
import EditBlog from "./components/update/editblog";
import PendingBlog from "./components/update/pendingblog";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";
import ForgotPassword from "./components/forgotpassword";
import Lockscreen from "./components/lockscreen";
import Error from "./components/error404";
import ErrorPage from "./components/error500";
import BasicInput from "./components/forms/baiscinput";
import { useUserContext } from "./Context/UserContext";
import DoctorEditPage from "./components/update/DoctorEditPage";
import PatientEditPage from "./components/update/PatientEditPage";
import ClinicEditPage from "./components/update/ClinicEditPage";
import Setting from "./components/settings";
import Invoices from "./components/invoices";
import WithdrawlRequests from "./components/withdrawalrequests";
const AppUniversal = function (props) {
  const { userMetaData: user } = useUserContext();
  return (
    <Router>
      <Switch>
        <Route path="(/|/login)" exact component={Login} />
        <Route path="/404" exact component={Error} />
        <Route path="/500" exact component={ErrorPage} />
        <Route path="/forgotPassword" exact component={ForgotPassword} />
        <Layout path="/profile" exact component={Profile} />
        {user ? (
          <>
            <Layout path="/doctor-list" exact component={Doctors} />
            <Layout path="/patient-list" exact component={Patients} />
            <Layout path="/clinics-list" exact component={Clinics} />
            <Layout path="/invoices-list" exact component={Invoices} />
            <Layout path="/keyword-search" exact component={KeywordSearch} />
            <Layout path="/doctor/:id" exact component={DoctorEditPage} />
            <Layout path="/patient/:id" exact component={PatientEditPage} />
            <Layout path="/clinic/:id" exact component={ClinicEditPage} />
            <Layout
              path="/withdrawl-requests"
              exact
              component={WithdrawlRequests}
            />
            <Layout path="/settings" exact component={Setting} />
          </>
        ) : (
          <Redirect to="/login" />
        )}
        {/* <Layout path="/dashboard" exact component={Dashboard} />
        <Route path="/appointment-list" exact component={Appointments} />
        <Route path="/specialities" exact component={Specialities} />
        <Route path="/reviews" exact component={Reviews} />
       
        <Route path="/transactions-list" exact component={Transaction} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/invoice-report" exact component={InvoiceReport} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/blog-details" exact component={BlogDetails} />
        <Route path="/add-blog" exact component={AddBlog} />
        <Route path="/edit-blog" exact component={EditBlog} />
        <Route path="/pending-blog" exact component={PendingBlog} />
        <Route path="/product-list" exact component={ProductList} />
        <Route path="/pharmacy-list" exact component={PharmacyList} />
        <Route path="/invoice" exact component={Invoice} />
        <Route path="/lockscreen" exact component={Lockscreen} />
        <Route path="/basic-input" exact component={BasicInput} /> */}
      </Switch>
    </Router>
  );
};
const Layout = ({ component: Component, isBtn = true, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => {
        return (
          <>
            <Header {...props} isBtn={isBtn} />
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

export default AppUniversal;
