import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import UserProfile from "./layout/UserProfile";
import Home from "./layout/Home";
import WorkoutList from "./layout/WorkoutList"
import WorkoutShow from "./layout/WorkoutShow"
import ExerciseSets from "./layout/ExerciseSets"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
        <AuthenticatedRoute exact path="/workouts" component={WorkoutList} user={currentUser} />
        <AuthenticatedRoute exact path="/workouts/:id" component={WorkoutShow} user={currentUser} />
        <AuthenticatedRoute exact path="/workouts/:id/exercises/:exerciseId" component={ExerciseSets} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
