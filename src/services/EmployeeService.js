import api from "../api/axiosConfig";

const getEmployees = () => api.get("/employees");

const createEmployee = (employee) => api.post("/employees", employee);

const updateEmployee = (id, employee) => api.put(`/employees/${id}`, employee);

const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export default {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
