const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../project/images')
    },

    fliename: (req, file, cb) => {
        console.log(file);
        cb(null, file.fliename + '-' + Date.now());
    }
})

const upload = multer({ storage: storage })
module.exports = upload;

module.exports = {
    upload
};