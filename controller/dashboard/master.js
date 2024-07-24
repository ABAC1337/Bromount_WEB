const bcrypt = require("bcrypt");
const Admin = require("../../models/adminModel");

const dashboardMaster = async (req, res) => {
    const session = req.session.admin
    const username = session ? session.username : null
    console.log(username)
    const datadb = await Admin.find({ role: 'admin' })
    res.render('dashboard-master', {
        username: username,
        data: datadb,
    })
}

const adminRegister = async (req, res) => {
    try {
        const { usernameRegister, emailRegister, passwordRegister, ViaR } = req.body;

        // Check if the user already exists
        const checkExistingUser = await Admin.findOne({
            $or: [{ email: emailRegister }, { username: usernameRegister }],
        });

        if (checkExistingUser) {
            req.flash("error", "User already exists");
            console.log(error.message);
            return res.redirect('/dashboard/master');
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordRegister, saltRounds);

        // Create new user with hashed password
        const newAdmin = await Admin.create({
            username: usernameRegister,
            email: emailRegister,
            password: hashedPassword,
            role: 'admin',
            via: ViaR,
        });

        // Redirect to login page with success message
        req.flash("success", "Registration successful");
        console.log("Registration successful");
        res.redirect('/dashboard/master');
    } catch (error) {
        req.flash("error", error.message);
        console.error(error);
        res.redirect('/dashboard/master'); // Redirect to registration page or appropriate page
    }
}
const deleteAdmin = async (req, res) => {
    const { id } = req.body;    
    try {
        // Perform the delete operation, e.g., using Mongoose if you're using MongoDB
        await Admin.findByIdAndDelete(id);
        res.redirect('/dashboard/master'); // Redirect to the dashboard or any other route
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { dashboardMaster, adminRegister, deleteAdmin }