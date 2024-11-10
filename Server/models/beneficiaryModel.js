const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  typeOfAccount: {
    type: String,
    required: true,
  },
});

const BeneficiaryModel = mongoose.model("BeneficiaryModel", beneficiarySchema);

module.exports = BeneficiaryModel;
