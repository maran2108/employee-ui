import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>EMP SYSTEM</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/">Logout</Link>
    </div>
  );
}

export default Sidebar;
