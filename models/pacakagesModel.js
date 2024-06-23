const mongoose = require('mongoose');

const packages = mongoose.model('packages', {
    via : String,
    harga : Number,
    rute : Array,
    noHp : String
})

module.exports = {
    packages
}