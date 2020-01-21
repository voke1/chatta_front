import React from "react";
import "./App.css";
import Chat from "./components/front/chat/chat.component";
import Error from "./pages/error";
import { Route, Switch } from "react-router-dom";
import { ManageBot } from "./pages/manageBot";
import { UserSettings } from "./pages/userSettings";
import { Dashboard } from "./pages/dashboard";
import { Bot } from "./components/admin/adminDashboard/Bot/admin-bots";
import { UserList } from "./pages/users";
import Register from "./components/admin/adminDashboard/Authentication/Register";
import Login from "./components/admin/adminDashboard/Authentication/Login";
import VerifyEmail from "./components/admin/adminDashboard/Authentication/emailVerification";
import CompaniesComponent from "./components/admin/adminDashboard/companies/listCompanies";
import BotUITemplate from './components/admin/adminDashboard/Bot/bot-UI-template-design'
import Triangle from './components/admin/adminDashboard/Bot/triangle2'
import InternetCheck from './components/admin/adminDashboard/Bot/internet-check'
// import CompaniesComponent from "./components/admin/adminDashboard/companies/listCompanies";
import { CompanySettings } from './components/admin/adminDashboard/Bot/companySettings'
import { FrontPage } from './components/front/landing-page/frontPage'
import { IthAdmin } from './components/ithAdmin/ithAdmin'
import { ProtectedRoute } from "./components/protectedRoutes"


function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={FrontPage}></Route>
        <Route exact path="/chatbot" component={Chat}></Route>
        <Route exact path="/ithadmin" component={IthAdmin}></Route>
        <ProtectedRoute exact path="/dashboard/admin/bot" component={Bot}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/admin" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/admin/user/:id" component={UserSettings}></ProtectedRoute>
        <Route exact path="/" component={Chat}></Route>
        <ProtectedRoute exact path="/dashboard/admin" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/admin/bot" component={Bot}></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/admin/user/:id"
          component={UserSettings}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/admin/bot/:id"
          component={ManageBot}
        ></ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/admin/user" component={UserList}></ProtectedRoute>
        <ProtectedRoute exact path='/dashboard/admin/company/us' component={CompanySettings}></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/dashboard/admin/company"
          component={CompaniesComponent}
        ></ProtectedRoute>
        <Route exact path="/auth/register" component={Register}></Route>
        <Route exact path="/auth/login" component={Login}></Route>
        <Route exact path="/auth/verify_email" component={VerifyEmail}></Route>
        <Route exact path="/preview" component={BotUITemplate}></Route>
        <Route exact path="/triangle" component={Triangle}></Route>
        <Route exact path="/internet" component={InternetCheck}></Route>
        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}

export default App;
