import './comAdduser.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const CompanyAddUsersRole = () => {
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
    const [department, setDepartment] = useState("");

    const departments = ["ICT", "HR", "Kitchen", "Front Office", "Store", "Account", "Audit", "F&B"];

    const validateForm = () => {
        let formErrors = {};
        if (!firstName) formErrors.firstName = "First Name is required.";
        if (!lastName) formErrors.lastName = "Last Name is required.";
        if (!designation) formErrors.designation = "Designation is required.";
        if (!department) formErrors.department = "Department is required."
        if (!contact.trim() || !/^\d{10}$/.test(contact)) {
            formErrors.contact = "Enter a valid 10-digit contact number.";
        }
        // if (!contact) formErrors.contact = "Contact is required.";
        if (!username) {
            formErrors.username = "Username is required.";
        } else if (existingUsernames.includes(username)) {
            formErrors.username = "This username is already taken. Please try another.";
        }
        if (!password) formErrors.password = "Password is required.";
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

    useEffect(() => {
        fetchAssets();
    }, []);


    //const [assetRegisterDetails, setAssetRegisterDetails] = useState([]);

    const fetchAssets = async () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get logged-in user details

        if (!currentUser || !currentUser.username) {
            console.error("User data not found or username missing");
            return;
        }

        try {
            // Fetch all registered users
            const userResponse = await axios.get("http://localhost:8000/api/users/getallUsers");
            const allUsers = userResponse.data;

            // Find the user that matches the current username
            const userData = allUsers.find(user => user.username === currentUser.username);

            if (!userData || !userData.companyName) {
                console.error("User company details not found");
                return;
            }

            setCompanyName(userData.companyName); // Store company name in state


        } catch (error) {
            console.error("Error fetching asset details or user data:", error);
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
            department,

        };

        try {
            const response = await axios.post('http://localhost:8000/api/users', userData);
            alert("User created successfully");
            handleReset();
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Error creating user. Please try again.");
        }
    };

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
                <Link to="/CompanyDashBord">DashBoard</Link> / <Link to="/companyUserRole">User Registration</Link>
            </p>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label>First Name*</label>
                            <input className="in3" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div><div className='col-md-6'>
                            <label>Last Name*</label>
                            <input className="in3" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}</div>
                    </div><div className='row'><div className='col-md-6'>
                        <label>Designation*</label>
                        <input className="in3" type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                        {errors.designation && <span className="error">{errors.designation}</span>}
                    </div>
                        <div className='col-md-6'>
                            <label>Contact*</label>
                            <input className="in3" type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                            {errors.contact && <span className="error">{errors.contact}</span>}</div></div><div className='row'>
                        <div className='col-md-6'>
                            <label>Username*</label>
                            <input className="in3" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {errors.username && <span className="error">{errors.username}</span>}
                        </div><div className='col-md-6'>
                            <label>Company Name*</label>
                            {/*<input  className="in3" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />*/}
                            <input className="in3" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} readOnly />

                            {errors.companyName && <span className="error">{errors.companyName}</span>}
                        </div></div>

                    <div className='row'><div className='col-md-6'>

                        <label>User Role*</label>
                        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                            <option value="">Select Role</option>

                            {/*<option value="CompanyAdmin">Company Admin</option>*/}
                            <option value="DepartmentAdmin">Department Admin(HOD)</option>
                        </select></div><div className='col-md-6'>

                            <label>Department*</label>
                            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                {departments.map((dep) => (
                                    <option key={dep} value={dep}>{dep}</option>
                                ))}
                                {errors.department && <span className="error">{errors.department}</span>}
                            </select></div>
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







                    <button className="btn1" type="button" onClick={handleReset}>Reset</button>
                    <button className="btn2" type="submit">Submit</button>
                </form>
            </fieldset>
        </div>
    );
};

export default CompanyAddUsersRole;
