import React from "react";
import "./App.css";
import Chat from "./components/front/chat/chat.component";
import Bot from "./components/admin/adminDashboard/admin-bots";
import Error from "./pages/error";
import Dashboard from "./pages/dashboard";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import EmailVerification from "./components/emailVerification";
import Intent from './components/admin/adminDashboard/bot-intent';
import OptionBox from './components/admin/adminDashboard/option-box'
import Accordion from './components/admin/adminDashboard/accordion'
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Chat}></Route>
        <Route exact path="/dashboard/admin" component={Dashboard}></Route>
        <Route exact path="/dashboard/admin/bot" component={Bot}></Route>
        <Route exact path="/dashboard/user" component={Chat}></Route>
        <Route exact path="/auth/register" component={Register}></Route>
        <Route exact path="/auth/login" component={Login}></Route>
        <Route exact path="/intent" component={Intent}></Route>
        <Route exact path="/option" component={OptionBox}></Route>
        <Route exact path="/accordion" component={Accordion}></Route>
        <Route
          exact
          path="/auth/verify_email"
          component={EmailVerification}
        ></Route>
        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}

export default App;
