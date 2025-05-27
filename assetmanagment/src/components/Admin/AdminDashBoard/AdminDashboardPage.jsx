import React, { useEffect, useState } from "react";
import axios from "axios";
import './admindashboard.css'
import AdminNavBar from "../AdminNav/AdminNav";
import { Link } from "react-router-dom";


const DashBoard = () => {
  const [Asset, setAsset] = useState([]);
  const [Admin, setAdmin] = useState(0);
  const [Companyadmin, setCompanyAdmin] = useState(0);
  const [DepartmentAdmin, setDepartmentAdmin] = useState(0);
  const[PendingAsset,setPendingAsset] = useState(0);
  const[PendingTransferAsset , setPendingTransferAsset] = useState(0);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const AssetResponse = await axios.get("http://localhost:8000/api/AssetRegisterDetails/getAssetDetails")
        setAsset(AssetResponse.data);




        // Fetch all users
        const usersResponse = await axios.get("http://localhost:8000/api/users/getallUsers");

        // Filter users with destination === 'admin'
        const adminUsers = usersResponse.data.filter(user => user.selectedOption === "Admin");
        setAdmin(adminUsers.length);

        const CompanyadminUsers = usersResponse.data.filter(user => user.selectedOption === "CompanyAdmin");
        setCompanyAdmin(CompanyadminUsers.length);

        const DepartmentadminUsers = usersResponse.data.filter(user => user.selectedOption === "DepartmentAdmin");
        setDepartmentAdmin(DepartmentadminUsers.length);

        const PendingTransferAsset = await axios.get("http://localhost:8000/api/transfer/getPendingTransferAssetDetails");
        setPendingTransferAsset(PendingTransferAsset.data.length);


        
              const PendingAsset = await axios.get("http://localhost:8000/api/PendingAssetRegisterDetails/getPendingAssetDetails");
               setPendingAsset(PendingAsset.data.length);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { count: Asset.length, label: "Total Asset", color: "blue", icon: <i className="fas fa-house-laptop si"></i> },
    { count: Admin, label: "Total Admin ", color: "green", icon: <i className="fas fa-user-tie si"></i> },
    { count: Companyadmin, label: "Total Company Users ", color: "orange", icon: <i className="fas fa-user si"></i> },
    { count: DepartmentAdmin, label: "Total Department Users", color: "red", icon: <i className="fas fa-users si"></i> },
    { count: PendingAsset, label: "Pending Register Asset", color: "DarkSlateGray", icon: <i className="fas fa-hourglass-half si"></i> },
    {count: PendingTransferAsset, label: "Pending Transfer Asset", color: "teal" , icon: <i className="fa-solid fa-spinner si"></i> },
  ];

  return (
    <div>
      <AdminNavBar />

      <div className="dashboard">
        <div className="dashboard-header">
        <h1  className="title1">{/*style={{ fontSize: "35px", textDecoration: "underline", marginBottom: "50px"}}*/}
  Dashboard
</h1>


          <p>
            <Link to="/">Home</Link> / <Link to="/AdminDashboardPage">DashBoard</Link>
          </p>
        </div>

        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div
              key={index}
              className="dashboard-card1"
              style={{ backgroundColor: card.color }}
            >
              <div className="card-content1">
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

export default DashBoard;
