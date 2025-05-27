import React, { useEffect, useState } from "react";
import axios from "axios";
import './auditDashBoard.css'

import { Link } from "react-router-dom";
import AuditNavBar from "../AuditNavBar/AuditNavBar";


const AuditDashBoard = () => {
  const [Asset, setAsset] = useState([]);
  const [PendingAsset, setPendingAsset] = useState(0);
  const [PendingDiscardAsset,  setPendingDiscardAsset] = useState(0);
  const [PendingTransferAsset, setPendingTransferAsset] = useState(0);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const AssetResponse = await axios.get("http://localhost:8000/api/AssetRegisterDetails/getAssetDetails")
        setAsset(AssetResponse.data);




        const PendingAsset = await axios.get("http://localhost:8000/api/PendingAssetRegisterDetails/getPendingAssetDetails");
        setPendingAsset(PendingAsset.data.length);


        const PendingDiscardAsset = await axios.get("http://localhost:8000/api/PendingAsset/getPendingDiscardAsset");
        setPendingDiscardAsset(PendingDiscardAsset.data.length);

const PendingTransferAsset = await axios.get("http://localhost:8000/api/transfer/getPendingTransferAssetDetails");
setPendingTransferAsset(PendingTransferAsset.data.length);




      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { count: Asset.length, label: "Total Asset", color: "blue", icon: <i className="fas fa-house-laptop si"></i> },
    { count: PendingAsset, label: "Pending Asset ", color: "teal", icon: <i className="fas fa-hourglass-half si"></i> },
    { count: PendingTransferAsset, label: "Pending Transfer Asset", color: "green", icon: <i className="fa-solid fa-spinner si"></i> },
    { count: PendingDiscardAsset, label: "Pending Discard Asset ", color: "red", icon: <i class="fas fa-trash si"></i> },
    
  ];

  return (
    <div>
      <AuditNavBar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="title">Dashboard</h1>
          <p>
            <Link to="/">Home</Link> / <Link to="/AuditDashBoard">DashBoard</Link>
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

export default AuditDashBoard;
