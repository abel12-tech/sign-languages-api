const express = require("express");
const signController = require("../controllers/signController");

const router = express.Router();

router
  .route("/")
  .get(signController.getAllSigns)
  .post(signController.createSign);

router
  .route("/:id")
  .get(signController.getSign)
  .patch(signController.updateSign)
  .delete(signController.deleteSign);

router.patch("/:id/approve", signController.approveSign);
router.patch("/:id/reject", signController.rejectSign);

module.exports = router;
