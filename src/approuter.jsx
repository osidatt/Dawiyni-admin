import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppUniversal from "./app-universal";

const AppRouter = (props) => {
  return (
    <Router>
      <Route render={(props) => <AppUniversal {...props} />} />
    </Router>
  );
};

export default AppRouter;
