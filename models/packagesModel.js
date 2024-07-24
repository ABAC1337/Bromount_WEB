const mongoose = require('mongoose');

const packagesSchema = new mongoose.Schema({
    via:{
        type:String,
        required: true,
    },
    harga:{
        type:Number,
        required: true,
    },
    foto:{
        type:String,
        required: true,
    },
    fotourl:{
        type:String,
        required: true,
    },
    rute:{
        type:Array,
        required:true,
    },
    noHp:{
        type:String,
        required: true,
    },
} ,{
    timestamps: true,
});

const Packages = mongoose.model('Packages', packagesSchema);
module.exports = Packages;