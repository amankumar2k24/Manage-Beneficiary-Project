const BeneficiaryModel = require("../models/BeneficiaryModel");
const UserModel = require("../models/UserModel");

const createUser = async (req, res) => {
  const { fullName, address, country, pincode } = req.body;
  try {
    const newUser = new UserModel({ fullName, address, country, pincode });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      userID: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

const addBeneficiary = async (req, res) => {
  const { userID, name, accountNumber, bankName, typeOfAccount } = req.body;
  try {
    if (!name || !accountNumber || !bankName || !typeOfAccount) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const newBeneficiary = await BeneficiaryModel.create({
      userID,
      name,
      accountNumber,
      bankName,
      typeOfAccount,
    });

    return res.status(201).json({
      message: "Beneficiary added successfully",
      result: newBeneficiary,
    });
  } catch (error) {
    console.error("Error adding beneficiary:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const viewBeneficiaries = async (req, res) => {
  try {
    const { userID } = req.params;
    const result = await BeneficiaryModel.find({ userID });

    return res.status(200).json({
      message: "Beneficiary fetched successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateBeneficiary = async (req, res) => {
  const { id } = req.params;
  const { name, accountNumber, bankName, typeOfAccount } = req.body;
  try {
    const beneficiary = await BeneficiaryModel.findByIdAndUpdate(
      id,
      { name, accountNumber, bankName, typeOfAccount },
      { new: true }
    );
    if (!beneficiary)
      return res.status(404).json({ message: "Beneficiary not found" });

    return res.status(200).json({
      message: "Beneficiary updated successfully",
      result: beneficiary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;
    const beneficiary = await BeneficiaryModel.findByIdAndDelete(id);
    if (!beneficiary)
      return res.status(404).json({ message: "Beneficiary not found" });

    return res.status(200).json({
      message: "Beneficiary deleted successfully",
    });
  } catch (error) {
    return res.status(500).json;
  }
};

module.exports = {
  createUser,
  addBeneficiary,
  viewBeneficiaries,
  updateBeneficiary,
  deleteBeneficiary,
};
