import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./QRView.css";
//import FlyingRavanaLogo from "/FlyingRavanaLogo.jpg"; // Make sure this file is in the public folder

const QRVIEW = () => {
  const { trackingId } = useParams();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        console.log(`Fetching data for Tracking ID: ${trackingId}`);
        const response = await axios.get(`http://localhost:8000/api/AssetRegisterDetails/${trackingId}`);

        if (response.data) {
          setQrData(response.data);
        } else {
          console.error("No asset data found.");
        }
      } catch (error) {
        console.error("Error fetching QR data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQRData();
  }, [trackingId]);

  // Dynamically change background image
  const viewStyle = {
    backgroundImage: qrData?.company === "Vella" 
    ? `url('/vellalogo.jpg')` 
    : qrData?.company === "98 Acres" 
    ? `url('/98.png')`
    : qrData?.company === "Ravana Pool Club" 
    ? `url('/RPC.png')` 
    : qrData?.company === "Flying Ravana" 
    ? `url('/FR.png')` 
    : qrData?.company === "Le Maas Tota" 
    ? `url('/lee.png')` 
    : qrData?.company === "Tea Factory" 
    ? `url('/tea.png')` 
    : qrData?.company === "Walaa kulu" 
    ? `url('/vala.png')` 
    : qrData?.company === "kiri kopi" 
    ? `url('/kirikopi.jpg')`  
    : "none",

    backgroundSize: '200px',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    boxShadow: "0px 4px 10px rgba(10, 10, 10, 0.6)",  // Adds a shadow around the element
    filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.6))", // Alternative method using filter

    
  };

  return (
    <div className="MainView" style={{ backgroundImage: `url('/Vella.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="View" >
        <h1 className="headQR">Scanned QR</h1>
        {loading ? (
          <p>Loading QR Data...</p>
        ) : qrData ? (
          <div className="details" style={viewStyle}>
            <p><strong>Asset Name:</strong> {qrData.assetName}</p>
            <p><strong>Tracking ID:</strong> {qrData.trackingId}</p>
            <p><strong>Company:</strong> {qrData.company}</p>
            <p><strong>Department:</strong> {qrData.department}</p>
            <p><strong>Main Category:</strong> {qrData.mainCategory}</p>
            <p><strong>Asset Model:</strong> {qrData.assetModel}</p>
            <p><strong>Serial Number:</strong> {qrData.serialNumber}</p>
            
          </div>
        ) : (
          <p>No data found for this Tracking ID.</p>
        )}
      </div>
    </div>
  );
};

export default QRVIEW;
