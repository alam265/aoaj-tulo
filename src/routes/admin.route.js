const express = require("express")
const router = express.Router()
const { saveAdmin, getAdmin } = require("../controllers/admin.controller")

router.get("/admin", getAdmin)
router.post("/admin", saveAdmin)


module.exports = router