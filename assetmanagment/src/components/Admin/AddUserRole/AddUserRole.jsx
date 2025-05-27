import './adduserrole.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const AddUsersRole = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [designation, setDesignation] = useState("");
    const [contact, setContact] = useState("");
    const [username, setUsername] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState("");
    const [existingUsernames, setExistingUsernames] = useState([]);
    const [department, setDepartment] = useState("")

    const departments = ["ICT", "HR", "Kitchen", "Front Office", "Store", "Account", "Audit", "F&B"];

    const validateForm = () => {
        let formErrors = {};
        if (!firstName) formErrors.firstName = "First Name is required.";
        if (!lastName) formErrors.lastName = "Last Name is required.";
        if (!designation) formErrors.designation = "Designation is required.";
        if (!contact.trim() || !/^\d{10}$/.test(contact)) {
            formErrors.contact = "Enter a valid 10-digit contact number.";
        }

        // Ensure department selection when "Department Admin" is chosen
        if (selectedOption === "DepartmentAdmin" && !department) {
            formErrors.department = "Department is required for Department Admin.";
        }
        if (!username) {
            formErrors.username = "Username is required.";
        } else if (existingUsernames.includes(username)) {
            formErrors.username = "This username is already taken. Please try another.";
        }
        if (!confirmPassword) formErrors.confirmPassword = "Confirm Password is required.";
        if (!companyName) formErrors.companyName = "Company Name is required.";
        if (password && !validatePasswordStrength(password)) {
            formErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, and a number.";
        }
        if (password !== confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match.";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const validatePasswordStrength = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const companies = ["Vella", "98 Acres", "Ravana Pool Club", "Flying Ravana", "Le Maas Tota", "Tea Factory", "Walaa kulu", "Kiri Kopi"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const userData = {
            firstName,
            lastName,
            designation,
            contact,
            username,
            selectedOption,
            password,
            companyName,
            department: selectedOption === "DepartmentAdmin" ? department : null // Ensure department is always included

        };

        try {
            await axios.post('http://localhost:8000/api/users', userData);
            alert("User created successfully");
            handleReset();
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Error creating user. Please try again.");
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/users/getallUsers");
            const usernames = response.data.map(user => user.username);
            setExistingUsernames(usernames);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch data when the component mounts
    }, []);

    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setDesignation("");
        setContact("");
        setUsername("");
        setSelectedOption("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setCompanyName("");
        setErrors({});
        setPasswordStrength("");
        setDepartment("");
    };

    return (
        <div className="Users">
            <h1 className='userhead'>User Registration</h1>
            <p>
                <Link to="/AdminDashboardPage">Dashboard</Link> / <Link to="/UsersRole">User Registration</Link>
            </p>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>First Name*</label>
                            <input className="input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                        <div className='col-md-6'>
                            <label>Last Name*</label>
                            <input className="input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Designation*</label>
                            <input className="input" type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                            {errors.designation && <span className="error">{errors.designation}</span>}
                        </div>
                        <div className='col-md-6'>
                            <label>Contact*</label>
                            <input className="input" type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                            {errors.contact && <span className="error">{errors.contact}</span>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <label>Username*</label>
                            <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {errors.username && <span className="error">{errors.username}</span>}
                        </div>
                        <div className='col-md-6'>
                            <label>Company Name*</label>
                            <select value={companyName} onChange={(e) => setCompanyName(e.target.value)}>
                                <option value="">Select Company</option>
                                {companies.map((com) => (
                                    <option key={com} value={com}>{com}</option>
                                ))}
                            </select>
                            {errors.companyName && <span className="error">{errors.companyName}</span>}
                        </div>
                    </div>

                    <label>Password*</label>
                    <input className="input"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);

                        }}
                    />
                    <span className={`password-strength ${passwordStrength.toLowerCase()}`}>{passwordStrength}</span>
                    {errors.password && <span className="error">{errors.password}</span>}

                    <label>Confirm Password*</label>
                    <input className="input"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

                    <label>
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                        Show Password
                    </label>

                    <label>User Role*</label>
                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="CompanyAdmin">Company Admin</option>
                        <option value="DepartmentAdmin">Department Admin (HOD)</option>
                        <option value="Audit">Audit</option>
                    </select>
                    {selectedOption === "DepartmentAdmin" && (
                        <div className="mb-3">
                            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep} value={dep}>{dep}</option>
                                ))}

                            </select>{errors.department && <span className="error">{errors.department}</span>}</div>
                    )}

                    <div className="button-group">
                        <button className="btn1" type="button" onClick={handleReset}>Reset</button>
                        <button className="btn2" type="submit">Submit</button>
                    </div>
                </form>
            </fieldset>
        </div>
    );
};

export default AddUsersRole;
