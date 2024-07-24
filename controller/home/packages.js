const Packages = require('../../models/packagesModel');

const getPackages = async (req, res) => {
    const packagesdb = await Packages.find()
    const session = req.session.user;
    const username = session ? session.username : null;
    res.render('packet', {
        packages: packagesdb,
        username: username,
        succeededLog: true
    })
}


module.exports = { getPackages }
