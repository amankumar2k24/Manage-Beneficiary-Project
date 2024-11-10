import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../redux/apiSlice";
import { toast } from "react-hot-toast";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    toast.success("User Created Successfully");
    console.log("dataaaa=>", data);
    dispatch(createUser(data)).then(() => {
      navigate("/manage-beneficiaries");
    });
  };

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
  ];

  return (
    <div className="form-container">
      <h2>Create User Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("fullName", { required: true })}
          placeholder="Full Name"
        />
        {errors.fullName && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <input
          {...register("address", { required: true })}
          placeholder="Address"
        />
        {errors.address && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <select {...register("country", { required: true })}>
          <option value="">Select Country</option> {/* Placeholder option */}
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <input
          {...register("pincode", { required: true })}
          placeholder="Pincode"
        />
        {errors.pincode && (
          <span style={{ color: "red" }}>This field is required</span>
        )}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default AddUser;
