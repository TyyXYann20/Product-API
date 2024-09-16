const multer = require("multer");

const Config = {
    pagination : 10,
    image_path : "C:/xampp/htdocs/img_path/ecm_backend_g1/pc_img/"
}

// Upload image
const server_directory = "C:/xampp/htdocs/image_api";
const uploadImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, server_directory);
        }
    }),
    limits: { fileSize: 1024 * 1024 * 4 } // 4MB limit
});

module.exports ={Config, uploadImage}