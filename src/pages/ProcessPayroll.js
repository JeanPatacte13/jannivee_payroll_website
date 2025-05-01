import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProcessPayroll.css";

const ProcessPayroll = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = employees.map((emp) => ({
      ...emp,
      tax: emp.tax || 0.1,
    }));
    setEmployeeData(updated);
  }, []);

  const handleChange = (index, field, value) => {
    const updatedData = [...employeeData];
    if (field === "salary" || field === "overtime" || field === "tax") {
      value = parseFloat(value) || 0;
    }
    updatedData[index][field] = value;
    setEmployeeData(updatedData);
  };

  const calculateTotal = (salary, overtime, tax) => {
    const hourlyRate = salary / 160;
    const overtimePay = overtime * hourlyRate * 1.5;
    const total = salary + overtimePay;
    const taxAmount = total * tax;
    const netTotal = total - taxAmount;
    return { overtimePay, total, taxAmount, netTotal };
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("employees", JSON.stringify(employeeData));
    alert("Changes saved!");
  };

  return (
    <div className="process-payroll">
      <h2>Process Payroll</h2>
      <button onClick={saveToLocalStorage}>Save Changes</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Base Salary</th>
            <th>Overtime Hours</th>
            <th>Overtime Pay</th>
            <th>Total Salary</th>
            <th>Tax Rate</th>
            <th>Tax Amount</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((emp, index) => {
            const { overtimePay, total, taxAmount, netTotal } = calculateTotal(
              emp.salary,
              emp.overtime,
              emp.tax
            );

            return (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={emp.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={emp.position}
                    onChange={(e) =>
                      handleChange(index, "position", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={emp.salary}
                    onChange={(e) =>
                      handleChange(index, "salary", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={emp.overtime}
                    onChange={(e) =>
                      handleChange(index, "overtime", e.target.value)
                    }
                  />
                </td>
                <td>₱{overtimePay.toFixed(2)}</td>
                <td>₱{total.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={emp.tax}
                    onChange={(e) => handleChange(index, "tax", e.target.value)}
                  />
                </td>
                <td>₱{taxAmount.toFixed(2)}</td>
                <td>₱{netTotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default ProcessPayroll;
