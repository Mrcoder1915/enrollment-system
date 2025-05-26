// app/pages/ProviderVerification.js
'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function ProviderVerification() {
  const [check,setChecked] = useState(false)
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    noMiddleName: false,
    emailAddress: '',
    contactNumber: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
const router = useRouter()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      
      middleName: name === 'noMiddleName' && checked ? '' : prev.middleName,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { lastName, firstName, emailAddress, contactNumber, middleName, noMiddleName } = formData;

    if (!lastName || !firstName || !emailAddress || !contactNumber) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        lastName,
        firstName,
        middleName: noMiddleName ? '' : middleName,
        emailAddress,
        contactNumber,
      };
      console.log("payload: ",payload);
      
      const response = await fetch('/api/instructor/profileverification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      

      if (response.ok) {
        handleClear(); 
        router.push("/InstructorPortal")
      } else {
        setErrorMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form. Please try again later.',error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      lastName: '',
      firstName: '',
      middleName: '',
      emailAddress: '',
      contactNumber: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r bg-fixed from-red-700 to-gray-100 p-4">
      <h1 className="text-white text-2xl font-semibold mb-4">Profile Verification</h1>
      
      <div className="bg-auto bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-4">
           <img src="/USNE.png" className="mx-auto w-24 my-2" alt="NEUST Logo" /> 
          <p className="text-red-800 font-bold text-md leading-tight">
            UNIVERSITY OF SOUTHERN<br />NUEVA ECIJA
          </p>
        </div>
        <form onSubmit={handleSubmit} className="text-sm">
          <label className="font-semibold block mt-2">Last Name:</label>
          <input type="text" name="lastName"  onChange={handleChange} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="Last Name" />

          <label className="font-semibold block mt-2">First Name:</label>
          <input type="text" name="firstName"  onChange={handleChange} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="First Name" />

          <label className="font-semibold block mt-2">Middle Name:</label>
          <input 
            type="text" 
            name="middleName" 
            
            onChange={handleChange}
            disabled={check}
             
            className="w-full p-2 mt-1 border border-red-400 rounded" 
            placeholder="Middle Name" 
          />
          
          <label className="block mt-1">
            <input 
              type="checkbox" 
              name="noMiddleName"  
              onChange={handleChange} 
              checked={check} onClick={() => setChecked(prev => !prev)}
              className="mr-2" 
            />
            I don't have a middle name.
          </label>

          <label className="font-semibold block mt-2">Email Address:</label>
          <input type="email" name="emailAddress" onChange={handleChange} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="Email Address" />

          <label className="font-semibold block mt-2">Contact:</label>
          <input type="text" name="contactNumber"  onChange={handleChange} className="w-full p-2 mt-1 border border-red-400 rounded" placeholder="Contact" />

          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="flex justify-end mt-6 space-x-2">
            
            <button type="reset" onClick={handleClear} className="bg-red-800 text-yellow-300 px-4 py-2 mr-50 rounded">Clear Entries</button>
            <button type="submit" className="bg-red-800 text-yellow-300 px-4 py-2 rounded" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Continue'}
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

