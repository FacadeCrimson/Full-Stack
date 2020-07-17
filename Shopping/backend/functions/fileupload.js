const fs = require('fs')


const fileUpload = {
    async upload(req, res, next){
        console.log(req.file.filename)
        console.log(req.body.category)
        req.body.imgname
    }
}

module.exports =fileUpload


const upload = async (image, folder, id) => {

    let dir = `images`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    dir = `images/${folder}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    await image.mv(`images/${folder}/${id}.png`);

    return `${config.DOMAIN}/images/${folder}/${id}`;
}

router.post( async (req, res) => {
    try {

        let image = req.files.image;

        if (!image)
            return res.status(400).send({ message: 'Image not provided!' });

        const imageUrl = await upload(image, req.params.folder, req.params.id);

        if (imageUrl)
            res.status(201).send({ message: "Image uploaded" });

    } catch (e) {
        res.status(400).send({ message: "Error uploading image!", error: e.toString(), req: req.body });
    }
});

// fs.unlinkSync(`images/${req.params.folder}/${req.params.id}.png`)
