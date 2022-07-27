

const getPage = async (req, res) => {
    return res.render("../views/index")
}

const getPic = async (req,res) => {
    return res.render("../views/fotosvf.ejs")
}

const getHom = async (req,res) => {
    return res.render("../views/homenagem.ejs")
}

const getCom = async (req,res) => {
    return res.render("../views/community.ejs")
}




module.exports = {
    getPage,
    getPic,
    getHom,
    getCom
}