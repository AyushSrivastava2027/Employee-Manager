import React, { useState } from 'react';
import axiosInstance from '../axios/axiosInstance';

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    role: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateMobileNumber = (mobile) => {
    return /^[0-9]{10}$/.test(mobile.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateMobileNumber(formData.mobile)) {
      setError('Mobile number must be exactly 10 digits');
      return;
    }

    try {
      const res = await axiosInstance.post('/employees', formData);
      setSuccess('Employee registered successfully!');
      setFormData({ email: '', mobile: '', role: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl mt-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Register Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 border rounded-md" required />
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile (10 digits only)" className="w-full px-4 py-2 border rounded-md" required />
        <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" className="w-full px-4 py-2 border rounded-md" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Submit</button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  );
};

export default RegisterEmployee;
