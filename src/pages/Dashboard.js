import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPayroll, setTotalPayroll] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setTotalEmployees(storedEmployees.length);

    const payroll = storedEmployees.reduce((total, employee) => {
      const hourlyRate = employee.salary / 160;
      const overtimePay = employee.overtime * hourlyRate * 1.5;
      return total + employee.salary + overtimePay;
    }, 0);

    setTotalPayroll(payroll);

    const storedActivities =
      JSON.parse(localStorage.getItem("recentActivities")) || [];

    const limitedActivities = storedActivities.slice(0, 5);
    setRecentActivities(limitedActivities);
  }, []);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>Jannivee Payroll Web Application</h2>
        <ul>
          <li>
            <Link to="/add-employee" className="sidebar-link">
              Add Employee
            </Link>
          </li>
          <li>
            <Link to="/process-payroll" className="sidebar-link">
              Process Payroll
            </Link>
          </li>
          <li>
            <Link to="/generate-payslip" className="sidebar-link">
              Generate Payslip
            </Link>
          </li>
          <li>
            <Link to="/view-reports" className="sidebar-link">
              View Reports
            </Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="main-content">
        <section className="quick-stats">
          <div className="stat-card">
            <h2>Total Employees</h2>
            <p>{totalEmployees}</p>
          </div>
          <div className="stat-card">
            <h2>Total Payroll (This Month)</h2>
            <p>₱{totalPayroll.toFixed(2)}</p>
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Activities</h2>
          <ul>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))
            ) : (
              <li>No recent activities</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
