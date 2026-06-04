import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>EMP SYSTEM</h2>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/employees">Employees</Link>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Sidebar;
