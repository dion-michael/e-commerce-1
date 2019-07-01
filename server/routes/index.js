const router = require('express').Router()
const gcs = require('../helpers/google-cloud-storage')

router.use('/users', require('./userRoutes.js'))
router.use('/products', require('./productRoutes.js'))
router.use('/transactions', require('./transactionRoutes.js'))
router.use('/upload',
    gcs.multer.single('image'),
    gcs.sendUploadToGCS,
    (req, res, next) => {
        console.log(req.body);
        if (!req.file) {
            res.status(404).json({
                message: "no image selected"
            })
        }
        res.json({
            message: "image uploaded",
            link: req.file.cloudStoragePublicUrl
        })
    })

module.exports = router