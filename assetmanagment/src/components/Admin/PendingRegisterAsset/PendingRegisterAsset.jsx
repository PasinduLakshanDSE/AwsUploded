import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pendingassetDetails.css";
import { Link } from "react-router-dom";

const PendingAssetDetails = () => {
    const [assetRegisterDetails, setAssetRegisterDetails] = useState([]);
    const [transferAssetDetails, setTransferAssetDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQuery1, setSearchQuery1] = useState("");
    const [searchQuery2, setSearchQuery2] = useState("");
    const [assetDetailsView, setAssetDetailsView] = useState("pendingregisterAsset"); // default view

    useEffect(() => {
        if (assetDetailsView === "pendingregisterAsset") {
            fetchRegisterAssets();
        } else {
            fetchTransferAssets();
        }
    }, [assetDetailsView]);

    const fetchRegisterAssets = () => {
        axios
            .get("http://localhost:8000/api/PendingAssetRegisterDetails/getPendingAssetDetails")
            .then((response) => setAssetRegisterDetails(response.data))
            .catch((error) => console.error("Error fetching register asset details:", error));
    };

    const fetchTransferAssets = () => {
        axios
            .get("http://localhost:8000/api/transfer/getPendingTransferAssetDetails")
            .then((response) => setTransferAssetDetails(response.data))
            .catch((error) => console.error("Error fetching transfer asset details:", error));
    };

    const handleDetailsView = (e) => {
        setAssetDetailsView(e.target.value);
    };

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

    const filteredAssets =
        assetDetailsView === "pendingregisterAsset"
            ? assetRegisterDetails.filter((asset) =>
                  [searchQuery, searchQuery1, searchQuery2].every(
                      (query) => !query || queryMatch(query, asset)
                  )
              )
            : transferAssetDetails.filter((asset) =>
                  [searchQuery, searchQuery1, searchQuery2].every(
                      (query) => !query || queryMatch(query, asset)
                  )
              );

    return (
        <div className="row details2">
            <div className="col-md-14">
                <h1 className="assethead">Pending Asset Details</h1>
                <p>
                    <Link to="/AdminDashboardPage">Dashboard</Link> /{" "}
                    <Link to="/pendingRegisterasset">Pending Asset Details</Link>
                </p>

                {/* Radio Buttons */}<div className="radio-toggle-container mb-4">
                <div className="radio-toggle-container mb-4">
    <label className={`radio-option1 ${assetDetailsView === "pendingregisterAsset" ? "active" : ""}`}>
        <input
            type="radio"
            name="AssetDetails"
            value="pendingregisterAsset"
            onChange={handleDetailsView}
            checked={assetDetailsView === "pendingregisterAsset"}
        />
        Pending Register Asset
    </label>
    <label className={`radio-option1 ${assetDetailsView === "pendingtransferasset" ? "active" : ""}`}>
        <input
            type="radio"
            name="AssetDetails"
            value="pendingtransferasset"
            onChange={handleDetailsView}
            checked={assetDetailsView === "pendingtransferasset"}
        />
        Pending Transfer Asset
    </label>
</div>
</div>

                {/* Search Fields */}
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Search by another parameter..."
                            value={searchQuery1}
                            onChange={(e) => setSearchQuery1(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Search by another parameter..."
                            value={searchQuery2}
                            onChange={(e) => setSearchQuery2(e.target.value)}
                        />
                    </div>
                </div>

                {/* Data Table */}
                <table className="table table-bordered table-light">
                    <thead className="thead-dark">
                        <tr>
                            
                            {assetDetailsView === "pendingregisterAsset" && <th>Registered Name</th>}
                            {assetDetailsView === "pendingtransferasset" && <th>Tranfered Date</th>}
                            <th>Company</th>
                            <th>Department</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Asset Name</th>
                            <th>User Name</th>
                            <th>Model</th>
                           
                             <th>Register Date</th>
                            {assetDetailsView === "pendingtransferasset" && <th>Tranfer Date</th>}
                            <th>Serial Number</th>
                            <th>Tracking ID</th>
                            <th>Special Note</th>
                            <th>Components</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset) => (
                                <tr key={asset._id}>
                                    <td>{asset.name}</td>
                                    <td>{asset.company}</td>
                                    <td>{asset.department}</td>
                                    <td>{asset.mainCategory}</td>
                                    <td>{asset.type}</td>
                                    <td>{asset.assetName}</td>
                                    <td>{asset.assetUserName}</td>
                                    <td>{asset.assetModel}</td>
                                    <td>{asset.assetUpdateDate}</td>
                                    {assetDetailsView === "pendingtransferasset" && (<td>{asset.assetTransferDate || "N/A"}</td>)}
                                    <td>{asset.serialNumber}</td>
                                    <td>{asset.trackingId}</td>
                                    <td>{asset.specialNote}</td>
                                    <td>{asset.computerComponents}</td>
                                    <td>
                                        <button className="status">Pending</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="14" className="text-center">
                                    No matching asset data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingAssetDetails;
