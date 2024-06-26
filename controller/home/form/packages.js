const {packages} = require('../../../models/pacakagesModel');

const getPackages = async(req,res)=>{
    const packagesdb = await packages.find()
    res.render('packet',{
        packages :packagesdb
    })
}

module.exports = { getPackages }
