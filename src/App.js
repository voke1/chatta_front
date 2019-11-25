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
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyEmail from "./components/emailVerification";
import FetchTree from './components/admin/adminDashboard/Bot/fetch-tree'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Chat}></Route>
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
        <Route exact path="/auth/register" component={Register}></Route>
        <Route exact path="/auth/login" component={Login}></Route>
        <Route exact path="/auth/verify_email" component={VerifyEmail}></Route>
        <Route exact path="/tree" component={FetchTree}></Route>
        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}

export default App;
