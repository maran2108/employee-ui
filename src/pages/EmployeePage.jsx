import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaBuilding } from "react-icons/fa";
import EmployeeService from "../services/EmployeeService";
import "./employee.css";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await EmployeeService.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openAddModal = () => {
    setId(null);
    setName("");
    setEmail("");
    setDepartment("");
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setId(employee.id);
    setName(employee.name);
    setEmail(employee.email);
    setDepartment(employee.department);

    setShowModal(true);
  };

  const saveEmployee = async () => {
    const employee = {
      name,
      email,
      department,
    };

    try {
      if (id) {
        await EmployeeService.updateEmployee(id, employee);
      } else {
        await EmployeeService.createEmployee(employee);
      }

      setShowModal(false);
      loadEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) return;

    try {
      await EmployeeService.deleteEmployee(employeeId);
      loadEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase()) ||
      emp.department?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="employee-page">
      <div className="page-header">
        <h1>Employee Management</h1>

        <button className="add-btn" onClick={openAddModal}>
          + Add Employee
        </button>
      </div>

      {/* Stats */}

      <div className="stats-container">
        <div className="stat-card">
          <h3>{employees.length}</h3>
          <p>Total Employees</p>
        </div>

        <div className="stat-card">
          <h3>{[...new Set(employees.map((emp) => emp.department))].length}</h3>
          <p>Departments</p>
        </div>

        <div className="stat-card">
          <h3>{employees.length}</h3>
          <p>Emails Registered</p>
        </div>
      </div>

      {/* Search */}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="modal-overlay">
          <div className="employee-modal">
            <div className="modal-header">
              <h2>{id ? "Update Employee" : "Add Employee"}</h2>

              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <div className="form-grid">
              <div className="input-group">
                <label>
                  <FaUser />
                  Employee Name
                </label>

                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>
                  <FaEnvelope />
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter employee email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group full-width">
                <label>
                  <FaBuilding />
                  Department
                </label>

                <input
                  type="text"
                  placeholder="Enter department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="save-btn" onClick={saveEmployee}>
                {id ? "Update Employee" : "Save Employee"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeePage;
