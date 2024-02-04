import React, { useState } from "react";
import { createACustomer } from "../services/adminService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission
    if (
      formData.first_name &&
      formData.last_name &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.email &&
      formData.phone &&
      formData.phone.length >= 10
    ) {
      createACustomer(formData)
        .then((data) => {
          toast.success("Customer added successfully");
          navigate("/admin/home");
        })
        .catch((error) => {
          if (error.response.status == 400) {
            toast.error("Email Already Exists");
          } else {
            toast.error("Error in Customer Creating");
          }
        });
    } else {
      if (formData.phone.length < 10) {
        toast.error("Phone number must be at least 10 characters");
      } else {
        toast.error("All fields are required");
      }
    }
  };

  return (
    <>
      <h2>Customer Details</h2>
      <div className="d-flex justify-content-center flex-wrap div">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="city"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
