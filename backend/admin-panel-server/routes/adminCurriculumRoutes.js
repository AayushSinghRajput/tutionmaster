const express = require("express");
const {
  adminGetCurriculum,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
  adminAddSubject,
  adminUpdateSubject,
  adminDeleteSubject,
} = require("../controllers/adminCurriculumController");
const { protectAdmin } = require("../middleware/adminAuth");

const router = express.Router();

router.use(protectAdmin);

router.get("/", adminGetCurriculum);
router.post("/categories", adminCreateCategory);
router.put("/categories/:id", adminUpdateCategory);
router.delete("/categories/:id", adminDeleteCategory);

router.post("/categories/:id/subjects", adminAddSubject);
router.put("/categories/:id/subjects/:subId", adminUpdateSubject);
router.delete("/categories/:id/subjects/:subId", adminDeleteSubject);

module.exports = router;
