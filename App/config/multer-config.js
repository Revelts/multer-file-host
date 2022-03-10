const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const indexOfString = file.originalname.split(".").pop();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + indexOfString);
    }
});


let fileFilter = function (req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png image files are allowed.'
        }, false);
    }
};

let obj = {
    storage: storage,
    limits: {
        fileSize: 200 * 1024 * 1024
},
    fileFilter: fileFilter
};

const upload = multer(obj).single('picture');

const fileUpload = (req, res) => {
    upload(req, res, function (error) {
        if (error) { 
            if (error.code == 'LIMIT_FILE_SIZE') {
                error.message = 'File Size is too large. Allowed file size is 200KB';
                error.success = false;
            }
            return res.status(400).json(error);
        } else {
            if (!req.file) {
                return res.status(400).json('file not found');
            }
            res.status(200).json({
                success: true,
                message: 'File uploaded successfully!',
                path: req.file.path
            });
        }
    })
};

module.exports = fileUpload