import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const date= Date.now()
        const type=file.originalname.slice(file.originalname.indexOf('.'))
        

        cb(null, file.fieldname +date+ '-'+type)
    }
})

const upload = multer({ storage })
export default upload;