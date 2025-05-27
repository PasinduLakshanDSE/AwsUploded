import React, { useEffect, useState } from "react";
import axios from "axios";
import './companyDashBoard.css'
import CompanyNavBar from "../CompanyNav/CompanyNav";
import { Link } from "react-router-dom";


const CompanyDashBoard = () => {
  const [Asset, setAsset] = useState([]);
  //const [Admin, setAdmin] = useState(0);
  const [Companyadmin, setCompanyAdmin] = useState(0);
  const [DepartmentAdmin, setDepartmentAdmin] = useState(0);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        {/*} const AssetResponse = await axios.get("http://localhost:8000/api/AssetRegisterDetails/getAssetDetails")
        setAsset(AssetResponse.data);*/}



        const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get logged-in user details

        if (!currentUser || !currentUser.username) {
          console.error("User data not found or username missing");
          return;
        }


        // Fetch all registered users
        const userResponse = await axios.get("http://localhost:8000/api/users/getallUsers");
        const allUsers = userResponse.data;

        // Find the user that matches the current username
        const userData = allUsers.find(user => user.username === currentUser.username);

        if (!userData || !userData.companyName) {
          console.error("User company details not found");
          return;
        }

        // Fetch asset details
        const assetResponse = await axios.get("http://localhost:8000/api/AssetRegisterDetails/getAssetDetails2");
        const filteredAssets = assetResponse.data.filter(asset => asset.company === userData.companyName);

        setAsset(filteredAssets); // Only set assets that match the company



        // Fetch all users
        const usersResponse = await axios.get("http://localhost:8000/api/users/getallUsers");

        // Filter users with destination === 'admin'
        /* const adminUsers = usersResponse.data.filter(user => user.selectedOption === "Admin");
         setAdmin(adminUsers.length);*/

        const CompanyadminUsers = usersResponse.data.filter(user => user.selectedOption === "CompanyAdmin" && user.companyName === userData.companyName);
        setCompanyAdmin(CompanyadminUsers.length);

        const DepartmentadminUsers = usersResponse.data.filter(user => user.selectedOption === "DepartmentAdmin" && user.companyName === userData.companyName);
        setDepartmentAdmin(DepartmentadminUsers.length);



      } catch (error) {
        console.error("Error fetching asset details or user data:", error);
      }

    };

    fetchDashboardData();
  }, []);

  const cards = [
    { count: Asset.length, label: "Total Asset", color: "blue", icon: <i className="fas fa-house-laptop si"></i> },
    // { count: Admin, label: "Total Admin ", color: "green", icon: <i className="fas fa-user-tie si"></i> },
    { count: Companyadmin, label: "Total Company Users ", color: "teal", icon: <i className="fas fa-user si"></i> },
    { count: DepartmentAdmin, label: "Total Department Users", color: "red", icon: <i className="fas fa-users si"></i> },
  ];

  return (
    <div>
      <CompanyNavBar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="title">Dashboard</h1>
          <p>
            <Link to="/">Home</Link> / <Link to="/CompanyDashBord">DashBoard</Link>
          </p>
        </div>

        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div
              key={index}
              className="dashboard-card"
              style={{ backgroundColor: card.color }}
            >
              <div className="card-content">
                <h2>{card.count}</h2>
                <p className="clabel">{card.label}</p>
              </div>
              <div className="card-icon">
                {card.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashBoard;
