import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import config from "config";
import AppUniversal from "./app-universal";

const AppRouter = (props) => {
  return (
    <Router basename={`${config.publicPath}`}>
      <Route render={(props) => <AppUniversal {...props} />} />
    </Router>
  );
};

export default AppRouter;
