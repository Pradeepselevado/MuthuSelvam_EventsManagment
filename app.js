const express = require('express');
const router = express();

router.use("/user", require("./Router/userRouter"));
router.use("/admin", require("./Router/adminRouter"));
router.use("/event", require("./Router/eventsRouter"));
router.use("/booking", require("./Router/bookingRouter"));


module.exports = router;
