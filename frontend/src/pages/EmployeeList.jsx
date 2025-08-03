import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ email: "", mobile: "", role: "" });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get("/employees");
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditClick = (index, employee) => {
    setEditIndex(index);
    setEditData({ ...employee });
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/employees/${editData._id}`, editData);
      const updated = [...employees];
      updated[editIndex] = { ...editData };
      setEmployees(updated);
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleCancel = () => setEditIndex(null);

  const handleChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6 text-center">Employee List</h2>
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Mobile</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id} className="border-b">
              <td className="py-3 px-4">
                {editIndex === index ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  emp.email
                )}
              </td>
              <td className="py-3 px-4">
                {editIndex === index ? (
                  <input
                    type="text"
                    name="mobile"
                    value={editData.mobile}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  emp.mobile
                )}
              </td>
              <td className="py-3 px-4">
                {editIndex === index ? (
                  <input
                    type="text"
                    name="role"
                    value={editData.role}
                    onChange={handleChange}
                    className="border px-2 py-1 w-full rounded"
                  />
                ) : (
                  emp.role
                )}
              </td>
              <td className="py-3 px-4 flex justify-center gap-2">
                {editIndex === index ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(index, emp)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
