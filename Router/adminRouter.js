const express = require('express');
const { Router } = express;
const { createAdmin, updateAdmin, deleteAdmin, getAdminById,getAllAdmins } = require('../Controllers/AdminControllers');
const router = Router();

router.post('/createAdmin', createAdmin);
router.post('/updateAdmin', updateAdmin);
router.get('/deleteAdmin/:AdminId', deleteAdmin);
router.get('/getAllAdmins', getAllAdmins);
router.get('/getAdminById/:AdminId', getAdminById);


module.exports = router;