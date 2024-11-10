import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBeneficiary } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddBeneficiary = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID") || "";
  console.log("userID");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(addBeneficiary({ ...data, userID })).unwrap();
      toast.success("Beneficiary added successfully!");
      navigate("/manage-beneficiaries");
    } catch (error) {
      toast.error("Failed to add beneficiary.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Beneficiary</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          placeholder="Beneficiary Name"
        />
        {errors.fullName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <input
          {...register("accountNumber", { required: true })}
          placeholder="Account Number"
        />
        {errors.accountNumber && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <input
          {...register("bankName", { required: true })}
          placeholder="Bank Name"
        />
        {errors.bankName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <select {...register("typeOfAccount", { required: true })}>
          <option value="">Select Account Type</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
        </select>
        {errors.accountType && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <button type="submit">Add Beneficiary</button>
      </form>
    </div>
  );
};

export default AddBeneficiary;
