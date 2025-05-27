import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./users.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/getallUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch data when the component mounts
  }, []);

  const handleBlock = async (id) => {
    const confirmLogout = window.confirm("Are you sure you want to Block?");
    if (confirmLogout) {
      try {
        await axios.put(`http://localhost:8000/api/users/block/${id}`);
        alert("User blocked successfully!");
        fetchUsers(); // Refresh the list after blocking
      } catch (error) {
        console.error("Error blocking user:", error);
        alert("An error occurred while blocking the user.");
      }
    }
  };

  const handleUnblock = async (id) => {
    const confirmLogout = window.confirm("Are you sure you want to UnBlock?");
    if (confirmLogout) {
      try {
        await axios.put(`http://localhost:8000/api/users/unblock/${id}`);
        alert("User unblocked successfully!");
        fetchUsers(); // Refresh the list after unblocking
      } catch (error) {
        console.error("Error unblocking user:", error);
        alert("An error occurred while unblocking the user.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${updatedUser._id}`, updatedUser);
      if (response.status === 200) {
        alert("User updated successfully!");
        fetchUsers(); // Refresh the list after update
        setShowEditModal(false); // Close the modal
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };



  const usersf = users.filter(usersf => {
    const queryMatch = (query, usersf) =>
      (usersf.firstName?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (usersf.lastName?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (usersf.username?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (usersf.companyName?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (usersf.
        selectedOption?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (usersf.
        department?.toLowerCase() || "").includes(query.toLowerCase())


    return [searchQuery, searchQuery1, searchQuery2].every(query => !query || queryMatch(query, usersf));
  });


  // Helper function to check OTP expiration
  const isOtpExpired = (expiresAt) => {
    const expireDate = new Date(expiresAt);
    const now = new Date();
    return expireDate < now;
  };


  return (
    <div className="row">
      <h1 className="assethead">User Details</h1>
      <p>
        <Link to="/AdminDashboardPage">DashBoard</Link> / <Link to="/Users">User Details</Link>
      </p>

      {/* Search Inputs */}<div className="row"><div className="col-md-4">
        <input type="text" className="form-control mb-2" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div><div className="col-md-4"><input type="text" className="form-control mb-2" placeholder="Search by another parameter..." value={searchQuery1} onChange={(e) => setSearchQuery1(e.target.value)} />
        </div>
      </div>

      <div className="col-md-13">
        <table className="table table-bordered table-light">
          <thead className="bs">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Designation</th>
              <th>Contact</th>
              <th>Username</th>
              
              <th>User Role</th>
              <th>Company Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
              <th>OTP</th>
              {/*<th>Expaire Time</th>*/}
            </tr>
          </thead>
          <tbody>
            {usersf.length > 0 ? (
              usersf.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.designation}</td>
                  <td>{user.contact}</td>
                  <td>{user.username}</td>
                  
                  <td>{user.selectedOption}</td>
                  <td>{user.companyName}</td>
                  <td>{user.department}</td>
                  <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                  <td className="d-flex gap-2">
                    <button className="btn btn-primary btn-md me-2" onClick={() => handleEdit(user)}>
                      Update
                    </button>
                    {user.isBlocked ? (
                      <button className="btn btn-success btn-md" onClick={() => handleUnblock(user._id)}>
                        Unblock
                      </button>
                    ) : (
                      <button className="btn btn-color btn-md" onClick={() => handleBlock(user._id)}>
                        Block
                      </button>
                    )}
                  </td>
                  
                  <td className="otp">{user.otp} <br></br>{user.otp ? (
            isOtpExpired(user.expiresAt) ? (
              <span className="text-danger1">Expired</span>
            ) : (
              <span className="activeOTP">Active</span> // Or you can leave it as empty or null depending on your requirement
            )
          ) : (
            <span>null</span> // No OTP available
          )}</td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No user data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {showEditModal && editingUser && (
          <EditUserModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            user={editingUser}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

const EditUserModal = ({ show, onClose, user, onUpdate }) => {
  const [updatedUser, setUpdatedUser] = useState(user || {});

  useEffect(() => {
    setUpdatedUser(user || {});
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(updatedUser);
  };
  const companies = ["Vella", "98 Acers", "Ravana Pool Club", "Flying Ravana", "Le Maas Tota", "Tea Factory", "Walaa kulu", "Kiri Kopi"];
  const departments = ["ICT", "HR", "Kitchen", "Front Office", "Store", "Account", "Audit", "F&B"];
  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" name="firstName" value={updatedUser.firstName || ''} onChange={handleChange} />

            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={updatedUser.lastName || ''} onChange={handleChange} />

            <label className="form-label">Designation</label>
            <input type="text" className="form-control" name="designation" value={updatedUser.designation || ''} onChange={handleChange} />

            <label className="form-label">Contact</label>
            <input type="text" className="form-control" name="contact" value={updatedUser.contact || ''} onChange={handleChange} />

            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={updatedUser.username || ''} onChange={handleChange} />

           
            {/* Company Name (Fixed: Using Select) */}
            <label className="form-label">Company Name</label>
            <select
              className="form-control"
              name="companyName"
              value={updatedUser.companyName || ''}
              onChange={handleChange}
            >
              <option value="">Select Company</option>
              {companies.map((com) => (
                <option key={com} value={com}>{com}</option>
              ))}
            </select>

            <label className="form-label">Department</label>
            <select
              className="form-control"
              name="department"
              value={updatedUser.department || ''}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>

            <label className="form-label">User Role</label>
            <select className="form-control" name="selectedOption" value={updatedUser.selectedOption || ''} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="CompanyAdmin">Company Admin</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
