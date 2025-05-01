import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import ProcessPayroll from "./pages/ProcessPayroll";
import GeneratePayslip from "./pages/GeneratePayslip";
import ViewReports from "./pages/ViewReports";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <LoginPage onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={() => (isLoggedIn ? <Dashboard /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/add-employee"
          render={() => (isLoggedIn ? <AddEmployee /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/process-payroll"
          render={() => (isLoggedIn ? <ProcessPayroll /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path="/generate-payslip"
          render={() =>
            isLoggedIn ? <GeneratePayslip /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/view-reports"
          render={() => (isLoggedIn ? <ViewReports /> : <Redirect to="/" />)}
        />
      </Switch>
    </Router>
  );
}

export default App;
