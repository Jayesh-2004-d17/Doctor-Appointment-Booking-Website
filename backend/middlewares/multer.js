/*import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req,file,callback){

    }
})

const upload = multer ({storage})

export default upload

*/

import multer from "multer";
import fs from "fs";

const uploadDir = "uploads";

// create folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;