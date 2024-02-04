import React, { useEffect, useState } from "react";
import { doLogout } from "../auth/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  allCustomers,
  getCustomerById,
  deleteACustomerById,
  updateACustomer,
} from "./../services/adminService";
import EditForm from "./EditForm";
const Home = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [searchColumn, setSearchColumn] = useState("first_name");

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await allCustomers();
        setCustomers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const getDataById = async () => {
    try {
      const data = await getCustomerById(id);
      setCustomer(data);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const fetchData = (event) => {
    event.preventDefault();
    getDataById(id);
  };

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
  }, [id]);

  const handelLogout = () => {
    doLogout(() => {
      toast.success("User LogOut Success");
    });
    navigate("/login");
  };

  const handleDelete = (id) => {
    deleteACustomerById(id);
    window.location.reload();
  };

  const handleEdit = (id) => {
    // Find the item to edit based on the id
    const itemToEdit = customers.find((item) => item.id === id);
    // Set the form data to the values of the item to edit
    setFormData(itemToEdit);
    // Set the editId to the id of the item being edited
    setEditId(id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  const handleSaveEdit = (editedData) => {
    // Implement logic to save the edited data
    // You may want to call an API or update the state directly, depending on your data source
    // Add your logic to handle the form submission
    console.log("Form submitted with data:", editedData);
    updateACustomer(editId, editedData)
      .then((data) => {
        toast.success("Customer Edited successfully");
        navigate("/admin/home");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status == 400) {
          toast.error("Email Already Exists");
        } else {
          toast.error("Error in Customer Creating");
        }
      });

    setEditId(null);
  };

  const filteredCustomers = customers.filter((customer) => {
    const fieldValue =
      searchColumn === "phone"
        ? customer[searchColumn]
        : customer[searchColumn].toLowerCase();
    return fieldValue.toLowerCase().includes(search.toLowerCase());
  });

  const syncData = () => {
    console.log("I was Trying my best but I didn't able to implement");
  };

  return (
    <div>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-outline-primary mb-3" onClick={handelLogout}>
          LogOut
        </button>
      </div>
      <h1 className="text-center mb-3 ">Customer List</h1>
      <hr />
      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            navigate(`/admin/customerForm`);
          }}
        >
          Add Customer
        </button>
        <select
          value={searchColumn}
          onChange={(e) => setSearchColumn(e.target.value)}
        >
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="address">Address</option>
          <option value="street">Street</option>
          <option value="city">City</option>
          <option value="state">State</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <button className="btn btn-outline-primary" onClick={syncData}>
          Sync
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((item) => (
            <React.Fragment key={item.id}>
              {editId === item.id ? (
                <EditForm
                  customer={formData} // Pass formData to EditForm
                  onSave={(editedData) => handleSaveEdit(editedData)}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <tr key={item.id}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.address}</td>
                  <td>{item.street}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
