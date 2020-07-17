const fileUpload = {
    async upload(req, res, next){
        res.status(201).send({ message: "Image uploaded" })
    } 
    
}

module.exports =fileUpload

// await image.mv(`images/${folder}/${id}.png`)
// fs.unlinkSync(`images/${req.params.folder}/${req.params.id}.png`)
