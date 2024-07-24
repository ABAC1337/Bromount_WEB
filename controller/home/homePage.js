const Packages = require('../../models/packagesModel')
const homepage = async (req, res) => {
    const getallPackages = await Packages.find()
    const session = req.session.user;
    const username = session ? session.username : null;
    res.render('index', {
        packages: getallPackages,
        username: username,
        succeededLog: true
    })
}
module.exports = { homepage }