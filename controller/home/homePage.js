const { packages } = require('../../models/pacakagesModel')
const homepage = async (req, res) => {
    const getallPackages = await packages.find()
    res.render('index', {
        packages: getallPackages
    })
}
module.exports = { homepage }