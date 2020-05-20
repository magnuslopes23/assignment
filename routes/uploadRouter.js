const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        return cb(null, 'public/images');
    },
    filename: (req, file, cb) =>{
        return cb(null, file.originalname);
    },
});
const imageFileFilter = (req, file, cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('you can upload only image files'), false)
    }
    cb(null, true);
}
const upload = multer({storage:storage, fileFilter:imageFileFilter})
const updateRouter = express();

updateRouter.use(bodyParser.json());

updateRouter.route('/')
.options(cors.corsWithOption, (req,res) =>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'),(req, res) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.json(req.file);
})
.put(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOption, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
})

module.exports = updateRouter;