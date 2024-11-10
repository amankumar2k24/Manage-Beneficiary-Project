import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import "./index.css";
import AddBeneficiary from "./components/AddBeneficiary";
import ManageBeneficiaries from "./components/ManageBeneficiaries";
import EditBeneficiary from "./components/EditBeneficiary";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/add-beneficiary" element={<AddBeneficiary />} />
        <Route path="/edit-beneficiary/:id" element={<EditBeneficiary />} />
        <Route path="/manage-beneficiaries" element={<ManageBeneficiaries />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
