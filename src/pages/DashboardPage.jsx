import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import EmployeeService from "../services/EmployeeService";
import MainLayout from "../components/MainLayout";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./dashboard.css";

function DashboardPage() {
  const [employees, setEmployees] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await EmployeeService.getEmployees();

      const employeeList = response.data;

      setEmployees(employeeList);
      setTotalEmployees(employeeList.length);

      // Department Count Calculation
      const departmentMap = {};

      employeeList.forEach((employee) => {
        const dept = employee.department || "Others";

        departmentMap[dept] = (departmentMap[dept] || 0) + 1;
      });

      const chartData = Object.keys(departmentMap).map((dept) => ({
        name: dept,
        employees: departmentMap[dept],
      }));

      setDepartmentData(chartData);
    } catch (error) {
      console.error("Failed to load employees", error);
    }
  };

  const pieColors = [
    "#2563eb",
    "#7c3aed",
    "#059669",
    "#ea580c",
    "#dc2626",
    "#0891b2",
  ];

  return (
    <div>
      <MainLayout>
        <div className="dashboard-container">
          <h1>Employee Dashboard</h1>

          {/* Summary Cards */}

          <div className="card-grid">
            <div className="dashboard-card">
              <h3>Total Employees</h3>
              <p>{totalEmployees}</p>
            </div>

            <div className="dashboard-card">
              <h3>Total Departments</h3>
              <p>{departmentData.length}</p>
            </div>
          </div>

          {/* Charts */}

          <div className="chart-grid">
            {/* Bar Chart */}

            <div className="chart-card">
              <h3>Employees By Department</h3>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="employees" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}

            <div className="chart-card">
              <h3>Department Distribution</h3>

              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    dataKey="employees"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Employees */}

          <div className="recent-card">
            <h3>Recent Employees</h3>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default DashboardPage;
