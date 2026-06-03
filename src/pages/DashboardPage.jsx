import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./dashboard.css";

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Topbar />

      <div className="dashboard-content">
        <div className="card">
          <h3>Total Employees</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Active</h3>
          <p>98</p>
        </div>

        <div className="card">
          <h3>Departments</h3>
          <p>5</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
