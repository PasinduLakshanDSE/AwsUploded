import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import AdminNavBar from "./components/Admin/AdminNav/AdminNav";
import DashBoard from "./components/Admin/AdminDashBoard/AdminDashboardPage";
import AddUsersRole from "./components/Admin/AddUserRole/AddUserRole";
//import AssetRegistration from "./components/Admin/AssetRegistration/AssetRegistration";
import CompanyDashBord from "./components/Company/CompanyDashBoard/CompanyDashBoard";
import CompanyNavBar from "./components/Company/CompanyNav/CompanyNav";
import Login from "./components/Login/Login";
import Users from "./components/Admin/Users/Users";
import AssetRegister from "./components/Admin/AssetRegistration/AssetRegister";
import Categorization from "./components/Admin/AssetCategorization/Assetcategorization";

import AssetDetails from "./components/Admin/AssetDetails/AssetDetails";
import QRVIEW from "./components/QRview/QRView";
import TransferForm from "./components/Admin/Transfer/Transfer"
import Contact from "./components/Home/Contact/Contact";
import About from "./components/Home/About/About";
import CompanyAddUsersRole from "./components/Company/ComAddUserRole/ComAddUser";
import ComAssetDetails from "./components/Company/ComAssetDetails/ComAssetDetails";
import ComAssetRegister from "./components/Company/CompanyAssetRegistration/ComAssetRegister";

import ComapnyUsers from "./components/Company/CompanyUsersDetails/CompanyUserDetails";
import ComapnyTransfer from "./components/Company/CompanyAssetTranfer/CompanyAssetTranfer";
import DepartmentNavBar from "./components/Department/DepartmentNav/DepartmentNav";
import DepartmentDashBoard from "./components/Department/DepartmentDashBoard/DepartmentDashBoard";
import DepAssetRegister from "./components/Department/DepAssetRegister/DepAssetRegister";

import DepAssetDetails from "./components/Department/DepAssetDetails/DepAssetDetails";
import DepartmentTransfer from "./components/Department/DepAssetTranfer/DepAssetTranfer";
//import DepartmentAddUsersRole from "./components/Department/DepartmentAddUser/DepAddUser";

//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Users from "./components/Users/Users";
import Report from "./components/Report/Report";
import AuditDashBoard from "./components/Audit/AuditDashboard/AuditDashBoard";
import AuditNavBar from "./components/Audit/AuditNavBar/AuditNavBar";

import PendingAssetDetails from "./components/Admin/PendingRegisterAsset/PendingRegisterAsset";
import PendingAsset from "./components/Audit/PendingAsset/PendingAsset";
import PendingDiscardAsset from "./components/Admin/PendingDiscardItem/PendingDiscard";
import PendingDiscardItem from "./components/Audit/PendingDiscardItem/PendingDiscardItem";
import TransferReport from "./components/Admin/TransferReport/TransferReport";



function App() {
  return (
    <div className="App">
       
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/AdminNavBar" element={<AdminNavBar/>}/>
        <Route path="/AdminDashboardPage"  element={<DashBoard/>}/>
        <Route path="/UsersRole"  element={<AddUsersRole/>}/>
       
        <Route path="/CompanyDashBord"  element={<CompanyDashBord/>}/>
        <Route path="/CompanyNavBar"  element={<CompanyNavBar/>}/>
        <Route path="/Login"  element={<Login/>}/>
        <Route path="/Users"  element={<Users/>}/>
        <Route path="/AssetRegister" element={<AssetRegister/>}/>
        <Route path="/category" element={<Categorization/>}/>
        <Route path="/AssetDetails" element={<AssetDetails/>}/>
        <Route path="/QRview/:trackingId" element={<QRVIEW/>}/>
        <Route path="/transfer-form" element={<TransferForm />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/companyUserRole" element={<CompanyAddUsersRole/>} />
        <Route path="/Comasset" element={<ComAssetDetails/>} />
        <Route path="/ComapnyAssetRegister" element={<ComAssetRegister/>} />
        
        <Route path="/CompanyUsers" element={<ComapnyUsers/>} />
        <Route path="/CompanyAssetTranfer" element={<ComapnyTransfer/>} />
        <Route path="/DepartmentNav" element={<DepartmentNavBar/>} />
        <Route path="/DepartmentDashBoard" element={<DepartmentDashBoard/>} />
        <Route path="/DepartmentAssetRegister" element={<DepAssetRegister/>} />
       
        <Route path="/DepartmentAssetDetails" element={<DepAssetDetails/>} />
        <Route path="/DepartmnetAssetTranfer" element={<DepartmentTransfer/>} />
        <Route path="/GetReport"  element={<Report/>} />
        <Route path="/AuditDashBoard" element={<AuditDashBoard/>} />
        <Route path="/AuditNavBar" element={<AuditNavBar/>} />
        <Route path="/pendingRegisterasset" element={<PendingAssetDetails/>} />
        <Route path="/PendingAsset" element={<PendingAsset/>} />
        <Route path="/PendingDiscardAsset" element={<PendingDiscardAsset/>} />
        <Route path="/PendingDiscardItem" element={<PendingDiscardItem/>} />
        <Route path="/TransferAssetReport" element={<TransferReport/>} />
        
      </Routes>
    </div>
   
  );
}

export default App;
