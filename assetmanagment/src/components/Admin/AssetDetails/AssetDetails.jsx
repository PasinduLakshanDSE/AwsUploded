import React, { useEffect, useState } from "react";
import axios from "axios";
import "./assetDetails.css";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "qrcode"; // Correct import

const AssetDetails = () => {
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
        axios.get("http://localhost:8000/api/AssetRegisterDetails/getAssetDetails")
            .then(response => setAssetRegisterDetails(response.data))
            .catch(error => console.error("Error fetching asset details:", error));
    };

    const navigate = useNavigate();

    const handleTransferClick = (asset) => {
        navigate("/transfer-form", { state: { asset } }); // Pass asset data via state
    };


    // Update an existing asset
    const handleUpdateAsset = (id, updatedAsset) => {
        axios.put(`http://localhost:8000/api/AssetRegisterDetails/updateAsset/${id}`, updatedAsset)
            .then(() => {
                fetchAssets();
                setEditingAsset(null);
            })
            .catch(error => console.error("Error updating asset:", error));
    };

    // Delete an asset
    const handleDeleteAsset = (id) => {
    const assetToDelete = assetRegisterDetails.find(asset => asset._id === id);

    if (window.confirm("Are you sure you want to delete this asset?")) {
        // Step 1: Post the asset to another collection
        axios.post("http://localhost:8000/api/DeletedAssets/add", assetToDelete)
            .then(() => {
                // Step 2: Delete from current collection after successful post
                axios.delete(`http://localhost:8000/api/AssetRegisterDetails/deleteAsset/${id}`)
                    .then(() => fetchAssets())
                    .catch(error => console.error("Error deleting asset:", error));
            })
            .catch(error => console.error("Error archiving asset before delete:", error));
    }
};



    const handleDownloadQR = (trackingId) => {
        const URL = `http://localhost:3000/QRView/${trackingId}`;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const qrSize = 80;
        const borderSize = 10;
        const textHeight = 20;

        canvas.width = qrSize + borderSize * 2;
        canvas.height = qrSize + borderSize * 2 + textHeight;

        ctx.fillStyle = "#0b4c55";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(borderSize, borderSize, qrSize, qrSize);

        const qrCanvas = document.createElement("canvas");
        QRCode.toCanvas(qrCanvas, URL, { width: qrSize }, (error) => {
            if (error) return console.error(error);
            ctx.drawImage(qrCanvas, borderSize, borderSize, qrSize, qrSize);

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 10px Arial";
            ctx.textAlign = "center";
            ctx.fillText(trackingId, canvas.width / 2, canvas.height - 10);

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `QR_Code_${trackingId}.png`;
            link.click();
        });
    };


    // Filter logic
    const filteredAssets = assetRegisterDetails.filter(asset => {
        const queryMatch = (query, asset) =>
            (asset.name?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.company?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.department?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.mainCategory?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.type?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.assetName?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.assetUserName?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.assetModel?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.serialNumber?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.trackingId?.toLowerCase() || "").includes(query.toLowerCase()) ||
            (asset.computerComponents?.toLowerCase() || "").includes(query.toLowerCase());

        return [searchQuery, searchQuery1, searchQuery2].every(query => !query || queryMatch(query, asset));
    });

    return (
        <div className="row">
            <div className="col-md-14">
                <h1 className="assethead">Asset Details</h1>
                <p>
                    <Link to="/AdminDashboardPage">DashBoard</Link> / <Link to="/AssetDetails">Asset Details</Link>
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
                            <th>Register Date</th>
                            <th>Serial Number</th>
                            <th>Tracking ID</th>
                            <th>Special Note</th>
                            <th>Components</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset) => (
                                <tr key={asset._id}>
                                    {editingAsset === asset._id ? (
                                        <>
                                            <td><input type="text" value={asset.name} onChange={(e) => setEditingAsset({ ...asset, name: e.target.value })} /></td>
                                            <td><input type="text" value={asset.company} onChange={(e) => setEditingAsset({ ...asset, company: e.target.value })} /></td>
                                            <td colSpan="10">
                                                <button className="btn btn-primary" onClick={() => handleUpdateAsset(asset._id, editingAsset)}>Save</button>
                                                <button className="btn btn-secondary" onClick={() => setEditingAsset(null)}>Cancel</button>
                                            </td>
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
                                            <td>{asset.isTransfer ? asset.assetTransferDate : asset.assetUpdateDate}</td>
                                            <td>{asset.serialNumber}</td>
                                            <td>{asset.trackingId}</td>
                                            <td>{asset.specialNote}</td>
                                            <td>{asset.computerComponents}</td>
                                            <td className="d-flex gap-2">
                                                <button className="btn btn-primary1" onClick={() => handleTransferClick(asset)}>Transfer</button>
                                                <button className="btn btn-danger2" onClick={() => handleDeleteAsset(asset._id)}>Discard</button>
                                                <button className="btn btn-success3" onClick={() => handleDownloadQR(asset.trackingId)}> QR  <i className="fas fa-download"></i></button>
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

export default AssetDetails;
