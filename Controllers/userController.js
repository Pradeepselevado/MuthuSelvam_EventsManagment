const userModal = require("../Modal/userModal");
const adminModal = require("../Modal/AdminModal");

module.exports.craeteUser = async (req, res) => {
    const { name, userName, mobileNumber, password } = req.body;
    try {
        if (!name) {
            return res.json({ status: false, message: "Name is required" });
        }
        const newUser = new userModal({ name, mobileNumber, password,userName });
        await newUser.save();
        return res.json({ status: true, message: "User created successfully", user: newUser });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.updateUser = async (req, res) => {
    const { userId, name, mobileNumber, password } = req.body;
    try {

        const user = await userModal.findById(userId);
        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }
        const updatedData = {};
        if (name) updatedData.name = name;
        if (mobileNumber) updatedData.mobileNumber = mobileNumber;
        if (password) updatedData.password = password;


        const updatedUser = await userModal.findByIdAndUpdate(userId, updatedData, { new: true });
        return res.json({ status: true, message: "User updated successfully", user: updatedUser });

    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModal.find();
        return res.json({ status: true, users });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModal.findById(userId);
        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }
        await userModal.findByIdAndDelete(userId);
        return res.json({ status: true, message: "User deleted successfully" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModal.findById(userId);
        if (!user) {
            return res.json({ status: false, message: "User not found" });
        }
        return res.json({ status: true, user });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });

    }
}

module.exports.login = async (req, res) => {
    const { userName, password } = req.body;
    try {

        let userDetails = await userModal.findOne({ userName, password });

        if (!userDetails) {
            return res.json({ status: false, message: "Invalid userName or password" });
        }
        return res.json({ status: true, message: "Login successful", userDetails });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.uniqueUserName = async (req, res) => {
    const { userName } = req.body;
    try {
        let userDetails = await userModal.findOne({ userName });

        if (userDetails) {
            return res.json({ status: false, message: "UserName already exists" });
        }
        return res.json({ status: true, message: "UserName is available" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}



