const express = require('express');
const { Router } = express;
const { createAdmin, updateAdmin, deleteAdmin, getAdminById,getAllAdmins,login } = require('../Controllers/AdminControllers');
const router = Router();

router.post('/createAdmin', createAdmin);
router.post('/updateAdmin', updateAdmin);
router.get('/deleteAdmin/:AdminId', deleteAdmin);
router.get('/getAllAdmins', getAllAdmins);
router.get('/getAdminById/:AdminId', getAdminById);
router.post('/login', login);


module.exports = router;