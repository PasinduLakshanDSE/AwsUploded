import React, { useState, useEffect } from "react";
import axios from "axios";
import "./transferReport.css";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';  // Import xlsx library

const TransferReport = () => {
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [type, setType] = useState("");
  const [selectedComputerComponent, setSelectedComputerComponent] = useState("");
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [allTypes, setAllTypes] = useState({});
  const [computerComponentOptions, setComputerComponentOptions] = useState([]);
  const [assetRegisterDetails, setAssetRegisterDetails] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  //const[oldAssetDetails, setOldAsset] =useState ([]);
  const [oldAssetDetails, setOldAssetDetails] = useState({});


  useEffect(() => {
    fetchAssets();

  }, []);

  const fetchAssets = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/AssetRegisterDetails/getAssetDetails");
    const allAssets = response.data;
    const transferAssets = allAssets.filter(asset => asset.isTransfer === true);
    setAssetRegisterDetails(transferAssets);

    // Fetch old asset details for each transferred asset
    const oldDetailsMap = {};

    await Promise.all(
      transferAssets.map(async (asset) => {
        const trackingId = asset.trackingId;
        try {
          const res = await axios.get(`http://localhost:8000/api/beforeTransfer/getBeforeTransferDetails/${trackingId}`);
          const oldData = res.data;

          const allHistory = [];

          if (Array.isArray(oldData)) {
            for (const old of oldData) {
              const newTrackID = old.trackingId;
              const moreRes = await axios.get(`http://localhost:8000/api/beforeTransfer/getBeforeTransferAllDetails/${newTrackID}`);
              const moreData = moreRes.data;

              if (Array.isArray(moreData)) {
                allHistory.push(...moreData);
              } else if (moreData) {
                allHistory.push(moreData);
              }
            }
          } else if (oldData) {
  let currentData = oldData;
const visitedTrackingIds = new Set(); // Prevent loops

while (currentData && !visitedTrackingIds.has(currentData.trackingId)) {
  visitedTrackingIds.add(currentData.trackingId); // Mark as visited
  allHistory.push(currentData);

  const newTrackID = currentData.trackingId;

  try {
    const moreRes = await axios.get(`http://localhost:8000/api/beforeTransfer/getBeforeTransferAllDetails/${newTrackID}`);
    const moreData = moreRes.data;

    if (Array.isArray(moreData) && moreData.length > 0) {
      currentData = moreData[0]; // continue with the first item
    } else if (moreData && typeof moreData === 'object') {
      currentData = moreData;
    } else {
      break;
    }

  } catch (error) {
    console.error(`Error fetching history for ${newTrackID}:`, error);
    break;
  

    }
  }
}


          oldDetailsMap[trackingId] = allHistory;
        } catch (err) {
          console.error(`Error fetching old data for ${trackingId}`, err);
        }
      })
    );

    setOldAssetDetails(oldDetailsMap);

    // Continue extracting unique values
    const uniqueCompanies = [...new Set(allAssets.map(asset => asset.company))];
    const uniqueDepartments = [...new Set(allAssets.map(asset => asset.department))];
    const uniqueCategories = [...new Set(allAssets.map(asset => asset.mainCategory))];
    const uniqueComponents = [...new Set(allAssets.map(asset => asset.computerComponents))].filter(Boolean);

    setCompanies(uniqueCompanies);
    setDepartments(uniqueDepartments);
    setMainCategories(uniqueCategories);
    setComputerComponentOptions(uniqueComponents);

    const groupedTypes = allAssets.reduce((acc, asset) => {
      if (!acc[asset.mainCategory]) {
        acc[asset.mainCategory] = new Set();
      }
      acc[asset.mainCategory].add(asset.type);
      return acc;
    }, {});
    setAllTypes(groupedTypes);
  } catch (error) {
    console.error("Error fetching asset details:", error);
  }
};





useEffect(() => {
    filterAssets();
  }, [company, department, mainCategory, type, selectedComputerComponent]);

  useEffect(() => {
    // Update types dropdown when category changes
    setTypes(mainCategory ? [...(allTypes[mainCategory] || [])] : []);
    setType(""); // Reset type selection
  }, [mainCategory]);

  const filterAssets = () => {
    let filtered = assetRegisterDetails;

    if (company) filtered = filtered.filter(asset => asset.company === company);
    if (department) filtered = filtered.filter(asset => asset.department === department);
    if (mainCategory) filtered = filtered.filter(asset => asset.mainCategory === mainCategory);
    if (type) filtered = filtered.filter(asset => asset.type === type);
    if (selectedComputerComponent) filtered = filtered.filter(asset => asset.computerComponents === selectedComputerComponent);

    setFilteredAssets(filtered);
  };

  // Function to download the filtered assets as Excel
  const downloadExcel = () => {
    if (filteredAssets.length === 0) {
      alert("No data available for download.");
      return;
    }

   const wb = XLSX.utils.book_new();
  const ws_data = [
    ["Label", "Registered Name", "Company", "Department", "Category", "Type", "Asset Name", "User Name", "Model","Register Date", "Transfer Date", "Serial Number", "Tracking ID", "Components"]
  ];

  filteredAssets.forEach(asset => {
  const history = oldAssetDetails[asset.trackingId] || [];

  // Transferred
  ws_data.push([
    "Transferred", asset.name, asset.company, asset.department,
    asset.mainCategory, asset.type, asset.assetName, asset.assetUserName,
    asset.assetModel, asset.assetUpdateDate, asset.assetTransferDate, asset.serialNumber,
    asset.trackingId, asset.computerComponents || "-"
  ]);

  // All Old Records
  history.forEach((old, i) => {
    ws_data.push([
      `Old ${i + 1}`, old?.name || "-", old?.company || "-", old?.department || "-",
      old?.mainCategory || "-", old?.type || "-", old?.assetName || "-",
      old?.assetUserName || "-", old?.assetModel || "-", old?.assetUpdateDate || "-", old?.assetTransferDate || "-",
      old?.serialNumber || "-", old?.trackingId || "-", old?.computerComponents || "-"
    ]);
  });
});

  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  // Apply styles to header row
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "004085" } }, // dark blue
    alignment: { horizontal: "center" }
  };

  const yellowCellStyle = {
    fill: { fgColor: { rgb: "FFFF00" } },
    font: { bold: true }
  };

  const lightYellowStyle = {
    fill: { fgColor: { rgb: "F3F381" } },
    font: { bold: true }
  };

  // Apply header styles
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell_address = { c: C, r: 0 };
    const cell_ref = XLSX.utils.encode_cell(cell_address);
    if (!ws[cell_ref]) continue;
    ws[cell_ref].s = headerStyle;
  }

  // Apply label-cell styles
  for (let R = 1; R <= range.e.r; ++R) {
    const labelCell = ws[XLSX.utils.encode_cell({ r: R, c: 0 })];
    if (labelCell?.v === "Transferred") labelCell.s = yellowCellStyle;
    if (labelCell?.v === "Old") labelCell.s = lightYellowStyle;
  }

  // Append sheet and write file
  XLSX.utils.book_append_sheet(wb, ws, "Transfer Report");
  XLSX.writeFile(wb, "Styled_Transfer_Report.xlsx");
  };


  return (
    <div>
      <h1 className="assethead" style={{ marginTop: "20px" }}>Download Transfer Report</h1>
      <p>
        <Link to="/AdminDashboardPage">Dashboard</Link> / <Link to="/TransferAssetReport">Report Transfer Details</Link>
      </p>

      {/* Filters Section */}
      <div className="filters">


        <input
          className="cat1"
          list="company-list"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Select company"
        />
        <datalist id="company-list">
          {companies.map((com, index) => (
            <option key={index} value={com}>{com}</option>
          ))}

        </datalist>

        <input
          className="cat1"
          list="department-list"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Select department"
        />
        <datalist id="department-list">
          {departments.map((dep, index) => (
            <option key={index} value={dep}>{dep}</option>
          ))}

        </datalist>

        <input
          className="cat1"
          list="mainCategory-list"
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          placeholder="Select Category"
        />
        <datalist id="mainCategory-list">
          {mainCategories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}

        </datalist>




        {mainCategory && (
          <>
            <input
              className="cat1"
              list="type-list"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Select type"
            />
            <datalist id="type-list">
              {types.map((t, index) => (
                <option key={index} value={t} />
              ))}
            </datalist>
          </>
        )}











        {type === "Computer" && (
          <>
            <input
              className="cat1"
              list="Component-list"
              value={selectedComputerComponent}
              onChange={(e) => setSelectedComputerComponent(e.target.value)}
              placeholder="Select Component"
            />
            <datalist id="Component-list">
              {computerComponentOptions.map((Ccom, index) => (
                <option key={index} value={Ccom} />
              ))}
            </datalist>
          </>
        )}

      </div>

      <div className="download-container">
        <button onClick={downloadExcel} className="download-btn1">Report <i className="fas fa-download"></i></button>
      </div>

      {/* Display Filtered Results */}
      {filteredAssets.length > 0 ? (
        <div>

          <table className="asset-table">
            <thead>
              <tr>
                <th></th>
                <th>Transfered Name/RegisterName</th>
                <th>Company</th>
                <th>Department</th>
                <th>Category</th>
                <th>Type</th>
                <th>Asset Name</th>
                <th>User Name</th>
                <th>Model</th>
                <th>Register Date</th>
                <th>Transfer Date</th>
                <th>Serial Number</th>
                <th>Tracking ID</th>
                <th>Components</th>

              </tr>
            </thead>
            <tbody>


              {filteredAssets.map((asset, index) => {
  const history = oldAssetDetails[asset.trackingId] || []; // now it's an array

  return (
    <React.Fragment key={index}>
      {/* Current Transferred Row */}
      <tr>
        <td className="label-cell transfer">Transferred</td>
        <td>{asset.name}</td>
        <td>{asset.company}</td>
        <td>{asset.department}</td>
        <td>{asset.mainCategory}</td>
        <td>{asset.type}</td>
        <td>{asset.assetName}</td>
        <td>{asset.assetUserName}</td>
        <td>{asset.assetModel}</td>
        <td>{asset.assetUpdateDate}</td>
        <td>{asset.assetTransferDate}</td>
        <td>{asset.serialNumber}</td>
        <td>{asset.trackingId}</td>
        <td>{asset.computerComponents || "-"}</td>
      </tr>

      {/* All Historical Transfers */}
      {history.map((old, i) => (
        <tr key={`history-${index}-${i}`}>
          <td className="label-cell old">Old {i + 1}</td>
          <td>{old?.name || "-"}</td>
          <td>{old?.company || "-"}</td>
          <td>{old?.department || "-"}</td>
          <td>{old?.mainCategory || "-"}</td>
          <td>{old?.type || "-"}</td>
          <td>{old?.assetName || "-"}</td>
          <td>{old?.assetUserName || "-"}</td>
          <td>{old?.assetModel || "-"}</td>
          <td>{old?.assetUpdateDate}</td>
          <td>{old?.assetTransferDate || "-"}</td>
          <td>{old?.serialNumber || "-"}</td>
          <td>{old?.trackingId || "-"}</td>
          <td>{old?.computerComponents || "-"}</td>
        </tr>
      ))}
    </React.Fragment>
  );
})}

            </tbody>
          </table>


        </div>
      ) : (
        <p>No matching assets found.</p>
      )}
    </div>
  );
};

export default TransferReport;
