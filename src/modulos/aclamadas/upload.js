const multer = require('multer');
const path = require('path');

const uploadDir = path.join(__dirname, '../../../public/uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage,
    
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png/;
        const mimeType = fileTypes.test(file.mimetype.toLowerCase());
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extname) {
            return cb(null, true);
        }

        return cb(new Error('Error: tipo de archivo no permitido'), false);
    },
    limits: 
    { fileSize: 1024 * 1024 * 5 }
 });


module.exports = upload;
