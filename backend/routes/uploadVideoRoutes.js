import path from 'path'
import express from 'express'
import multer from 'multer'
import ffmpeg from 'fluent-ffmpeg'
const router = express.Router()

let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/videos')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /mp4/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Chỉ tải file video mp4!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('video')

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (!req.file) return res.send('Please ')

    if (err) {
      return res.json({ success: false, err })
    }

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    })
  })
})

router.post('/thumbnail', (req, res) => {
  let filePath = ''
  let fileDuration = ''

  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata) // all metadata
    console.log(metadata.format.duration)
    fileDuration = metadata.format.duration
  })

  ffmpeg(req.body.url)
    .on('filenames', function (filenames) {
      console.log('Will generate ' + filenames.join(', '))
      console.log(filenames)

      filePath = 'uploads/thumbnails/' + filenames[0]
    })
    .on('end', function (filenames) {
      console.log('Screenshots taken')
      console.log(filenames)
      return res.json({
        success: true,
        url: filePath,
        fileName: filenames,
        fileDuration: fileDuration,
      })
    })
    .on('error', function (err) {
      console.error(err)
      return res.json({ success: false, err })
    })
    .screenshots({
      // Will take screenshots at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: 'uploads/thumbnails',
      size: '320x240',
      filename: 'thumbnail-%b.png',
    })
})

export default router
