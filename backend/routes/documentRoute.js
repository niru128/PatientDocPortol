import express from 'express';
import multer from 'multer';

import { uploadDocument, getDocument, downloadDocument ,deleteDocument} from '../controller/documentController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage,
    fileFilter: function (req, file, cb) {
        if(file.mimetype!="application/pdf"){
            return cb(new Error('Only PDF files are allowed!'), false);
        }
        cb(null, true);
    }
 });

router.post('/upload', upload.single('file'), uploadDocument);
router.get("/", getDocument);
router.get("/:id", downloadDocument);
router.delete("/:id", deleteDocument);


export default router;