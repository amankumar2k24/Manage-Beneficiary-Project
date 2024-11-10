import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBeneficiaries,
  deleteBeneficiary,
  updateBeneficiary,
} from "../redux/apiSlice";
import { Link } from "react-router-dom";
import EditBeneficiary from "./EditBeneficiary";
import toast from "react-hot-toast";

const ManageBeneficiaries = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  const beneficiaries = useSelector((state) => state.api.beneficiaries);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);

  useEffect(() => {
    if (userID) {
      dispatch(fetchBeneficiaries(userID));
      // toast.success("Beneficiaries fetched successfully");
    }
  }, [userID, dispatch]);

  const handleEdit = (beneficiary) => {
    setEditingBeneficiary(beneficiary);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2>Manage Beneficiaries</h2>
        <Link to="/add-beneficiary">
          <button>Add Beneficiary</button>
        </Link>
      </div>

      {editingBeneficiary ? (
        <EditBeneficiary
          beneficiary={editingBeneficiary}
          onCancel={() => setEditingBeneficiary(null)}
        />
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Account Number
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Bank Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Account Type
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries?.result?.length > 0 ? (
              beneficiaries.result.map((beneficiary, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {beneficiary.name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {beneficiary.accountNumber}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {beneficiary.bankName}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {beneficiary.typeOfAccount}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      margin: "0 auto",
                    }}
                  >
                    <button
                      style={{
                        width: "100px",
                        background: "red",
                        color: "white",
                      }}
                      onClick={() => {
                        dispatch(deleteBeneficiary(beneficiary._id));
                        toast.success("Beneficiary deleted successfully");
                      }}
                    >
                      Remove
                    </button>
                    <button
                      style={{
                        width: "100px",
                        background: "green",
                        color: "white",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleEdit(beneficiary)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "8px" }}>
                  Please add some beneficiaries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBeneficiaries;
