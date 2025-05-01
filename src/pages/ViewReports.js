import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ViewReports.css";

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(storedReports);
  }, []);

  const handleSelectReport = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="view-reports">
      <h2>View Reports</h2>

      <div className="report-list">
        <h3>Available Reports</h3>
        <ul>
          {reports.length > 0 ? (
            reports.map((report) => (
              <li key={report.id}>
                <button onClick={() => handleSelectReport(report)}>
                  {report.title} - {report.date}
                </button>
              </li>
            ))
          ) : (
            <p>No reports available.</p>
          )}
        </ul>
      </div>

      {selectedReport && (
        <div className="report-details">
          <h3>Report Details</h3>
          <p>
            <strong>Title:</strong> {selectedReport.title}
          </p>
          <p>
            <strong>Date:</strong> {selectedReport.date}
          </p>
          <p>
            <strong>Type:</strong> {selectedReport.type}
          </p>
          {selectedReport.employee && (
            <p>
              <strong>Employee:</strong> {selectedReport.employee}
            </p>
          )}
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

export default ViewReports;
