import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GeneratePayslip.css";

const GeneratePayslip = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payslip, setPayslip] = useState(null);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployeeData(storedEmployees);
  }, []);

  const calculatePayslip = (employee) => {
    const overtimeRate = 1.5;
    const hourlyRate = employee.salary / 160;
    const overtimePay = employee.overtime * hourlyRate * overtimeRate;
    const totalSalary = employee.salary + overtimePay;

    return {
      name: employee.name,
      position: employee.position,
      baseSalary: employee.salary,
      overtime: employee.overtime,
      overtimePay,
      totalSalary,
    };
  };

  const handleGeneratePayslip = (employee) => {
    const payslipData = calculatePayslip(employee);
    setPayslip(payslipData);

    const report = {
      id: new Date().getTime(),
      title: `Payslip Report - ${employee.name}`,
      date: new Date().toLocaleDateString(),
      type: "Payslip",
      employee: employee.name,
    };

    const existingReports = JSON.parse(localStorage.getItem("reports")) || [];

    existingReports.push(report);

    localStorage.setItem("reports", JSON.stringify(existingReports));

    const activity = `Payslip generated for ${employee.name}`;
    const storedActivities =
      JSON.parse(localStorage.getItem("recentActivities")) || [];
    storedActivities.unshift(activity);
    localStorage.setItem("recentActivities", JSON.stringify(storedActivities));
  };

  return (
    <div className="generate-payslip">
      <h2>Generate Payslip</h2>

      <div className="employee-select">
        <h3>Select Employee</h3>
        <select
          onChange={(e) => {
            const selectedEmp = employeeData.find(
              (emp) => emp.name === e.target.value
            );
            setSelectedEmployee(selectedEmp);
          }}
        >
          <option value="">Select an Employee</option>
          {employeeData.map((employee, index) => (
            <option key={index} value={employee.name}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      {selectedEmployee && (
        <div className="generate-button">
          <button onClick={() => handleGeneratePayslip(selectedEmployee)}>
            Generate Payslip
          </button>
        </div>
      )}

      {payslip && (
        <div className="payslip">
          <h3>Payslip for {payslip.name}</h3>
          <p>Position: {payslip.position}</p>
          <p>Base Salary: ₱{payslip.baseSalary}</p>
          <p>Overtime Hours: {payslip.overtime}</p>
          <p>Overtime Pay: ₱{payslip.overtimePay.toFixed(2)}</p>
          <p>Total Salary: ₱{payslip.totalSalary.toFixed(2)}</p>
        </div>
      )}

      <div className="back-btn-container">
        <Link to="/dashboard" className="back-btn">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default GeneratePayslip;
