const express = require("express");
const {
  createUser,
  updateBeneficiary,
  deleteBeneficiary,
  addBeneficiary,
  viewBeneficiaries,
} = require("../controllers/userController");

const router = express.Router();

router.post("/users", createUser);
router.post("/beneficiaries", addBeneficiary);
router.get("/beneficiaries/:userID", viewBeneficiaries);
router.put("/beneficiaries/:id", updateBeneficiary);
router.delete("/beneficiaries/:id", deleteBeneficiary);

module.exports = router;
