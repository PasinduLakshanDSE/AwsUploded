import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pendingDiscardItem.css";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "qrcode"; // Correct import

const PendingDiscardItem = () => {
    const [assetRegisterDetails, setAssetRegisterDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQuery1, setSearchQuery1] = useState("");
    const [searchQuery2, setSearchQuery2] = useState("");


    // State for editing
    const [editingAsset, setEditingAsset] = useState(null);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = () => {
        axios.get("http://localhost:8000/api/PendingAsset/getPendingDiscardAsset")
            .then(response => setAssetRegisterDetails(response.data))
            .catch(error => console.error("Error fetching asset details:", error));
    };

    const navigate = useNavigate();

  


   

    

   

    // Filter logic
    const filteredAssets = assetRegisterDetails.filter(asset => {
        const queryMatch = (query, asset) =>
            (asset.name?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.company?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.department?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.mainCategory?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.type?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.assetName?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.assetModel?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.serialNumber?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.trackingId?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.computerComponents?.toLowerCase() || "").includes(query.toLowerCase());

        return [searchQuery, searchQuery1, searchQuery2].every(query => !query || queryMatch(query, asset));
    });



    const handleVerifyDeleteAsset = (id) => {
        if (window.confirm("Are you sure you want to Discard this asset?")) {
          axios.delete(`http://localhost:8000/api/PendingAsset/discardAsset/${id}`)
            .then(() => {
              alert("Asset Discard successfully!");
              fetchAssets(); // Refresh the pending list
            })
            .catch(error => {
              console.error("Error Discard asset:", error);
              alert("Failed to Discard asset.");
            });
        }
      };
      

    return (
        <div className="row">
            <div className="col-md-14">
                <h1 className="assethead">Discard Asset</h1>
                <p>
                    <Link to="/AuditDashBoard">DashBoard</Link> / <Link to="/PendingDiscardItem">Discard Asset</Link>
                </p>

                {/* Search Inputs */}<div className="row"><div className="col-md-4">
                    <input type="text" className="form-control mb-2" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div><div className="col-md-4"><input type="text" className="form-control mb-2" placeholder="Search by another parameter..." value={searchQuery1} onChange={(e) => setSearchQuery1(e.target.value)} />
                    </div><div className="col-md-4"><input type="text" className="form-control mb-2" placeholder="Search by another parameter..." value={searchQuery2} onChange={(e) => setSearchQuery2(e.target.value)} />
                    </div></div>
                {/* Asset Table */}
                <table className="table table-bordered table-light">
                    <thead className="thead-dark">
                        <tr>
                            <th>Registered Name</th>
                            <th>Company</th>
                            <th>Department</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Asset Name</th>
                            <th>User Name</th>
                            <th>Model</th>
                            <th>Update Date</th>
                            <th>Serial Number</th>
                            <th>Tracking ID</th>
                            <th>Special Note</th>
                            <th>Components</th>
                            <th>Action</th>

                            
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset) => (
                                <tr key={asset._id}>
                                    {editingAsset === asset._id ? (
                                        <>
                                            
                                        </>
                                    ) : (
                                        <>
                                            <td>{asset.name}</td>
                                            <td>{asset.company}</td>
                                            <td>{asset.department}</td>
                                            <td>{asset.mainCategory}</td>
                                            <td>{asset.type}</td>
                                            <td>{asset.assetName}</td>
                                            <td>{asset.assetUserName}</td>
                                            <td>{asset.assetModel}</td>
                                            <td>{asset.assetUpdateDate}</td>
                                            <td>{asset.serialNumber}</td>
                                            <td>{asset.trackingId}</td>
                                            <td>{asset.specialNote}</td>
                                            <td>{asset.computerComponents}</td>
                                            <td>
  <button className="status"
    onClick={() => handleVerifyDeleteAsset(asset._id)}
  >
  Verify
  </button>
</td>

                                            
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" className="text-center">No matching asset data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingDiscardItem;
