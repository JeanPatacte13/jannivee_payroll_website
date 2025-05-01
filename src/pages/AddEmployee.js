import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeOvertime, setEmployeeOvertime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      name: employeeName,
      email: employeeEmail,
      position: employeePosition,
      salary: parseFloat(employeeSalary),
      overtime: parseInt(employeeOvertime),
    };

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employees));

    const activity = `New employee added: ${employeeName}`;
    const storedActivities =
      JSON.parse(localStorage.getItem("recentActivities")) || [];
    storedActivities.unshift(activity);
    localStorage.setItem("recentActivities", JSON.stringify(storedActivities));

    setEmployeeName("");
    setEmployeeEmail("");
    setEmployeePosition("");
    setEmployeeSalary("");
    setEmployeeOvertime("");
  };

  return (
    <div className="add-employee">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employeeEmail">Employee Email:</label>
          <input
            type="email"
            id="employeeEmail"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employeePosition">Employee Position:</label>
          <input
            type="text"
            id="employeePosition"
            value={employeePosition}
            onChange={(e) => setEmployeePosition(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employeeSalary">Employee Salary:</label>
          <input
            type="number"
            id="employeeSalary"
            value={employeeSalary}
            onChange={(e) => setEmployeeSalary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employeeOvertime">Overtime Hours:</label>
          <input
            type="number"
            id="employeeOvertime"
            value={employeeOvertime}
            onChange={(e) => setEmployeeOvertime(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add Employee</button>
        </div>
      </form>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default AddEmployee;
