import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Chat from "./components/front/chat/chat.component";
import Bot from "./components/admin/adminDashboard/admin-bots";
import Error from "./pages/error";
import Dashboard from "./pages/dashboard";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Chat}></Route>
        <Route exact path="/dashboard/admin" component={Dashboard}></Route>
        <Route exact path="/dashboard/admin/bot" component={Bot}></Route>
        <Route exact path="/dashboard/user" component={Chat}></Route>
        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}

export default App;
