import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateBeneficiary } from "../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditBeneficiary = ({ beneficiary, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: beneficiary,
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(
        updateBeneficiary({ beneficiaryID: beneficiary._id, updatedData: data })
      ).unwrap();
      toast.success("Beneficiary updated successfully!");
      onCancel();
    } catch (error) {
      toast.error("Failed to update beneficiary.");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Beneficiary</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          placeholder="Beneficiary Name"
        />
        {errors.name && (
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
        {errors.typeOfAccount && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditBeneficiary;
