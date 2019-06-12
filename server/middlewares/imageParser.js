const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage,
}).array("carImage", 10);


const parseImages = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.send(err.message)
        } else {
            const arr = req.files.map((file) => file.path);
            req.carImages = arr;
            next();
        }
    })
}

export default parseImages