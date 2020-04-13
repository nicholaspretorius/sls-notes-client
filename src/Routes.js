import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import NewNote from "./containers/NewNote/NewNote";
import Note from "./containers/Note/Note";
import Settings from "./containers/Settings/Settings";
import Billing from "./containers/Billing/Billing";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import ChangePassword from "./containers/ChangePassword/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail/ChangeEmail";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/reset-password">
        <ResetPassword />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/settings">
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/billing">
        <Billing />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/change-password">
        <ChangePassword />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/change-email">
        <ChangeEmail />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/new">
        <NewNote />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/notes/:id">
        <Note />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
