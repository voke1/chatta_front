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
// import CompaniesComponent from "./components/admin/adminDashboard/companies/listCompanies";
import { CompanySettings } from './components/admin/adminDashboard/Bot/companySettings'
import FrontPage from './components/front/landing-page/frontPage'


function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={FrontPage}></Route>
        <Route exact path="/chatbot" component={Chat}></Route>
        <Route exact path="/dashboard/admin" component={Dashboard}></Route>
        <Route exact path="/dashboard/admin/bot" component={Bot}></Route>
        <Route
          exact
          path="/dashboard/admin/user/:id"
          component={UserSettings}
        ></Route>
        <Route
          exact
          path="/dashboard/admin/bot/:id"
          component={ManageBot}
        ></Route>
        <Route exact path="/dashboard/admin/user" component={UserList}></Route>
        <Route exact path='/dashboard/admin/company/us' component={CompanySettings}></Route>
        <Route
          exact
          path="/dashboard/admin/company"
          component={CompaniesComponent}
        ></Route>
        <Route exact path="/auth/register" component={Register}></Route>
        <Route exact path="/auth/login" component={Login}></Route>
        <Route exact path="/auth/verify_email" component={VerifyEmail}></Route>
        <Route exact path="/preview" component={BotUITemplate}></Route>
        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}

export default App;
