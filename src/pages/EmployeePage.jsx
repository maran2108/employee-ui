import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaBuilding } from "react-icons/fa";

import EmployeeService from "../services/EmployeeService";

import MainLayout from "../components/MainLayout";

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
    if (!window.confirm("Delete employee?")) return;

    await EmployeeService.deleteEmployee(employeeId);

    loadEmployees();
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase()) ||
      emp.department?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="employee-page">
        <div className="page-header">
          <h1>Employee Management</h1>

          <button className="add-btn" onClick={openAddModal}>
            + Add Employee
          </button>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>{employees.length}</h3>
            <p>Total Employees</p>
          </div>

          <div className="stat-card">
            <h3>{[...new Set(employees.map((e) => e.department))].length}</h3>
            <p>Departments</p>
          </div>

          <div className="stat-card">
            <h3>{employees.length}</h3>
            <p>Emails Registered</p>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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

        {showModal && (
          <div className="modal-overlay">
            <div className="employee-modal">
              <div className="modal-header">
                <h2>{id ? "Update Employee" : "Add Employee"}</h2>

                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>
                    <FaEnvelope />
                    Email
                  </label>

                  <input
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
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default EmployeePage;
