'use client';
import { useState } from 'react';

export default function ProviderVerification() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    noMiddleName: false,
    emailAddress: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
      middleName: name === 'noMiddleName' && checked ? '' : formData.middleName,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lastName, firstName, emailAddress, contact } = formData;

    if (!lastName || !firstName || !emailAddress || !contact) {
      alert('Please fill out all required fields.');
      return;
    }

    console.log('Form submitted:', formData);
    alert('Profile verification successful! Please check your email for further instructions.');
  };

  const handleClear = () => {
    setFormData({
      lastName: '',
      firstName: '',
      middleName: '',
      noMiddleName: false,
      emailAddress: '',
      contact: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-fixed from-red-700 to-gray-100 p-4">
      <h1 className="text-white text-2xl font-semibold mb-4">Profile Verification</h1>
      
      <div className="bg-auto bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-4">
          <img src="/neustlogo-nobg.png" className="mx-auto w-24 my-2" />
          <p className="text-red-800 font-bold text-md leading-tight">
            UNIVERSITY OF SOUTHERN<br />NUEVA ECIJA
          </p>
        </div>
        <form onSubmit={handleSubmit} className="text-sm">
          <label className="font-semibold block mt-2">Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="Last Name" />

          <label className="font-semibold block mt-2">First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="First Name" />

          <label className="font-semibold block mt-2">Middle Name:</label>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} disabled={formData.noMiddleName} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="Middle Name" />
          
          <label className="block mt-1">
            <input type="checkbox" name="noMiddleName" checked={formData.noMiddleName} onChange={handleChange} className="mr-2" />
            I don't have a middle name.
          </label>

          <label className="font-semibold block mt-2">Email Address:</label>
          <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="Email Address" />

          <label className="font-semibold block mt-2">Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="Contact" />

          <div className="flex justify-end mt-6 space-x-2">
            <button type="button" onClick={handleClear} className="bg-red-800 text-yellow-300 px-4 mr-50 rounded">Clear Entries</button>
            <button type="submit" className="bg-red-800 text-yellow-300 px-4 py-2 rounded">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}