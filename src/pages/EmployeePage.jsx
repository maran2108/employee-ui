import { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./employee.css";

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const res = await EmployeeService.getEmployees();
    setEmployees(res.data);
  };

  const saveEmployee = async () => {
    const emp = { name, email, department };

    if (editId) {
      await EmployeeService.updateEmployee(editId, emp);
    } else {
      await EmployeeService.createEmployee(emp);
    }

    clear();
    loadEmployees();
  };

  const deleteEmployee = async (id) => {
    await EmployeeService.deleteEmployee(id);
    loadEmployees();
  };

  const editEmployee = (emp) => {
    setEditId(emp.id);
    setName(emp.name);
    setEmail(emp.email);
    setDepartment(emp.department);
  };

  const clear = () => {
    setEditId(null);
    setName("");
    setEmail("");
    setDepartment("");
  };

  return (
    <div>
      <Sidebar />
      <Topbar />

      <div className="employee-container">
        <div className="form-card">
          <h2>Employee Management</h2>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <button onClick={saveEmployee}>{editId ? "Update" : "Save"}</button>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Dept</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button onClick={() => editEmployee(emp)}>Edit</button>
                    <button onClick={() => deleteEmployee(emp.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
