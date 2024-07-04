const multer = require('multer');
const path = require('path');

// Multer configuracion para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../../frontend/public/uploads')); 
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
    { fileSize: 1024 * 1024 * 5 } // 5MB maximo para el archivo subido
 });


module.exports = upload;