const Packages = require('../../models/packagesModel')

const dashboardAdmin = async (req, res) => {
    const session = req.session.admin;
    const username = session ? session.username : null;

    try {
        if (!session.via) {
            console.error('Session via is not defined');
            return res.status(400).send('Session via is not defined');
        }

        const pckagesdb = await Packages.find({ via: session.via });

        res.render('dashboard-admin', {
            username: username,
            packages: pckagesdb // Include packages in the render if necessary
        });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).send('Internal Server Error');
    }
};
const create = async (req, res) => {
    const session = req.session.admin;
    try {
        const formdata = req.body
        const img = req.file
        const CreatePackages = await Packages.create({
            via: session.via,
            harga: formdata.harga,
            noHp: formdata.nohp,
            foto: img.filename,
            fotourl: '/uploaded-images/' + img.filename,
            rute: [
                formdata.rute_1,
                formdata.rute_2,
                formdata.rute_3,
                formdata.rute_4,
            ],
            idvia: req.session.admin._id
        })
        res.redirect('/dashboard/admin')

    } catch (error) {

    }
}
const edit = async (req, res) => {
    const session = req.session.admin;
    const { id } = req.body
    try {
        const formdata = req.body
        const img = req.file
        const CreatePackages = await Packages.updateOne({ _id: id }, {
            via: session.via,
            harga: formdata.harga,
            noHp: formdata.nohp,
            foto: img.filename,
            fotourl: '/uploaded-images/' + img.filename,
            rute: [
                formdata.rute_1,
                formdata.rute_2,
                formdata.rute_3,
                formdata.rute_4,
            ],
            idvia: req.session.admin._id
        })
        res.redirect('/dashboard/admin')
    } catch (error) {

    }
}
const remove = async (req, res) => {
    const { id } = req.body;
    try {
        // Perform the delete operation, e.g., using Mongoose if you're using MongoDB
        await Packages.findByIdAndDelete(id);
        res.redirect('/dashboard/admin') // Redirect to the dashboard or any other route
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { dashboardAdmin, create, edit, remove }