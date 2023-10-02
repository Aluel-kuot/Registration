"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormData {
  first_name: string;
  last_name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  const initialFormData: FormData = {
    first_name : '',
    last_name : '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };

  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setPasswordMatchError('Passwords do not match');
      } else {
        setPasswordMatchError(null);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Record<string, string> = {};
    if (!formData.first_name.trim()) {
      validationErrors.first_name = 'First Name is required';
    }
    if (!formData.last_name.trim()) {
      validationErrors.last_name = 'Last Name is required';
    }
    if (!formData.email.trim() || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      validationErrors.email = 'Required email address';
    }
    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone Number is required';
    }
   
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(validationErrors).length === 0) {
      alert('Registration successful!');
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="relative w-full h-screen">
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0, 0, 0, 0.97)] to-[rgba(1, 0, 8, 0.85)]"></div>
  <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/Images/pic.jpg)' }}></div>
  <p className="text-purple-400 text-3xl font-bold mb-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    Begin managing your inventory efficiently with us
  </p>
</div>
      <div className="text-center py-20 px-32 w-[1400px] h-[100vh] max-w-4xl shadow-md bg-white">
        <h2 className="text-4xl mb-25 ml-12 text-purple-900 font-bold font-Lato">Register </h2>
        <form onSubmit={handleSubmit} className='ml-32'>
          <div className="text-left mt-4 font-flex flex-col">
            <label htmlFor="first name" className="text-black mt-2 font-bold text-xl">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="w-[420px] h-[5vh] text-black px-1 py-3 mb-5 border border-black rounded-lg shadow-lg"
              placeholder="Enter  first name"
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
          </div>
          
          <div className="text-left mt-2 font-latoflex flex-col">
            <label htmlFor="last name" className="text-black mt-2 font-bold text-xl">
              Last  Name
            </label>
            <input
              type="text"
              id="last_name"
              name=" last_name"
              className="w-[420px] h-[5vh] text-black px-1 py-3 mb-5 border border-black rounded-md"
              placeholder="Enter last name"
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
          </div>
          
          <div className="text-left mt-2 font-lato flex flex-col">
            <label htmlFor="email" className="text-black font-bold text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-[420px] h-[5vh] text-black px-1 py-3 mb-5 border border-black rounded-md"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="text-left mt-2 font-latoflex flex-col">
            <label htmlFor="phoneNumber" className="text-black font-bold text-xl">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-[420px] h-[5vh] text-black px-1 py-3 mb-5 border border-black rounded-md"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
          </div>
         
          <div className="text-left mt-2 font-lato relative">
  <label htmlFor="password" className="text-black font-bold text-1xl">
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      name="password"
      className="w-[420px] h-[5vh] text-black px-1 py-3 mb-5 border border-black rounded-md pr-10 pl-2"
      placeholder="Enter Password"
      value={formData.password}
      onChange={handleChange}
    />
    <button
      type="button"
      className="absolute top-1/3 right-1/4 -mr-7 transform -translate-y-1/2 focus:outline-none"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <FaEye className="text-black cursor-pointer" />
      ) : (
        <FaEyeSlash className="text-black cursor-pointer" />
      )}
    </button>
  </div>
  {errors.password && <p className="text-red-500">{errors.password}</p>}
</div>
      <div className="text-left mt-2 font-merriweather relative">
          <label htmlFor="confirmPassword" className="text-black font-bold text-1xl mt-3">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            className="w-[420px] h-[5vh] text-black px-1 py-3 mb-5 border border-black rounded-md pr-10 pl-2"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute top-1/2 right-1/4 -mr-7 transform -translate-y-1/2 focus:outline-none"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FaEye className="text-black cursor-pointer" />
            ) : (
              <FaEyeSlash className="text-black cursor-pointer" />
            )}
          </button>
          {passwordMatchError && <p className="text-red-500">{passwordMatchError}</p>}
        </div>
          <div className="flex justify-between items-center mb-5 text-1xl font-lato mt-3"></div>
          <button
            type="submit"
            className="bg-purple-950 text-white py-3 px-20 mr-24 font-bold rounded-md text-2xl cursor-pointer mt-5 font-lato"
            onClick={() => setShowPassword(!showPassword)}
          >
          Register
          </button>
          <p className="text-2xl font-lato mr-24 text-black mt-12">
            Already have an account?{' '}
            <Link href='/login'>
              <span className='text-purple-900 font-bold'>Log In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;










