import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/lessonDocuments')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /pdf|epub/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    const error = new Error('Chỉ tải file có đuôi .pdf hoặc .epub')
    error.status = 400
    cb(error)
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.array('lessonDocuments', 10), (req, res) => {
  const filesPaths = req.files.map((file) => `/${file.path}`)
  res.send(filesPaths)
})

export default router
