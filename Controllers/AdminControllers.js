
const AdminModal = require("../Modal/AdminModal");

module.exports.createAdmin = async (req, res) => {
    const { adminName, mobileNumber, password } = req.body;
    try {
        if (!adminName) {
            return res.json({ status: false, message: "adminName is required" });
        }
        const newAdmin = new AdminModal({ adminName, mobileNumber, password });
        await newAdmin.save();
       return res.json({ status: true, message: "Admin created successfully", Admin: newAdmin });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.updateAdmin = async (req, res) => {
    const { adminId, adminName, mobileNumber, password } = req.body;
    try {

        const Admin = await AdminModal.findById(adminId);
        if (!Admin) {
            return res.json({ status: false, message: "Admin not found" });
        }
        const updatedData = {};
        if (adminName) updatedData.adminName = adminName;
        if (mobileNumber) updatedData.mobileNumber = mobileNumber;
        if (password) updatedData.password = password;


        const updatedAdmin = await AdminModal.findByIdAndUpdate(adminId, updatedData, { new: true });
        return res.json({ status: true, message: "Admin updated successfully", Admin: updatedAdmin });

    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getAllAdmins = async (req, res) => {
    try {
        const Admins = await AdminModal.find();
        return res.json({ status: true, Admins });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.deleteAdmin = async (req, res) => {
    const { AdminId } = req.params;
    try {
        const Admin = await AdminModal.findById(AdminId);
        if (!Admin) {
            return res.json({ status: false, message: "Admin not found" });
        }
        await AdminModal.findByIdAndDelete(AdminId);
        return res.json({ status: true, message: "Admin deleted successfully" });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
}

module.exports.getAdminById = async (req, res) => {
    const { AdminId } = req.params;
    try {
        const Admin = await AdminModal.findById(AdminId);
        if (!Admin) {
            return res.json({ status: false, message: "Admin not found" });
        }
        return res.json({ status: true, Admin });
    }
    catch (error) {
        return res.json({ message: "Server error", error: error.message });

    }
}



