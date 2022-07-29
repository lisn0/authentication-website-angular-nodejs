const express = require('express');
const {createUser, showOneUser, showUsers, deleteUser, updateUser} = require("../controllers/user.controller");
const router = express.Router();

// /users
router.post("/add", createUser )
router.get("/list", showUsers )
router.get("/show/:id" , showOneUser)
router.delete('/delete/:id', deleteUser);
router.put("/update/:id" , updateUser);

module.exports = router;
