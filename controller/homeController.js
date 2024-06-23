const getHome = async(req,res)=>{
    res.render('index')
}

const getAbout = async(req,res)=>{
    res.render('about')
}

const getGallery = async(req,res)=>{
    res.render('galery')
}

module.exports = {
    getHome,
    getAbout,
    getGallery
}