import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// USER PAGES

import Login from "./Login/";
import LoginBoxed from "./LoginBoxed/";

import Register from "./Register/";
import RegisterOTP from "./RegisterOTP/";
import RegisterBoxed from "./RegisterBoxed/";

import ForgotPassword from "./ForgotPassword/";
import ChangePassword from "./ChangePassword/";
import ForgotPasswordBoxed from "./ForgotPasswordBoxed/";

const UserPages = ({ match }) => (
  <Fragment>
    <div className="app-container">
      {/* User Pages */}

      <Route path={`${match.url}/login`} component={Login} />
      <Route path={`${match.url}/login-boxed`} component={LoginBoxed} />
      <Route path={`${match.url}/register`} component={Register} />
      <Route path={`${match.url}/verifyUser`} component={RegisterOTP} />
      <Route path={`${match.url}/register-boxed`} component={RegisterBoxed} />
      <Route path={`${match.url}/forgot-password`} component={ForgotPassword} />
      <Route path={`${match.url}/change-password`} component={ChangePassword} />
      <Route path={`${match.url}/forgot-password-boxed`} component={ForgotPasswordBoxed}/>
    </div>
  </Fragment>
);

export default UserPages;
