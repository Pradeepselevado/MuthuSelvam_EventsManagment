const express = require('express');
const { Router } = express;
const { craeteUser, updateUser, getAllUsers, deleteUser, getUserById ,login} = require('../Controllers/userController');
const router = Router();

router.post('/create-user', craeteUser);
router.post('/update-user', updateUser);
router.get('/get-all-users', getAllUsers);
router.get('/delete-user/:userId', deleteUser);
router.get('/get-by-userId/:userId', getUserById);
router.post('/login', login);


module.exports = router;