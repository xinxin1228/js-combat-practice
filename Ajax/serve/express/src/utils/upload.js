const { join, extname } = require('path')
const multer = require('multer')
const dayjs = require('dayjs')

/**
 * 上传文件
 * @param {string} path 文件存储路径，相对于public
 * @param {number} maxCount 上传文件的最大数量，为0时表示不限制
 */
const upload = (path = '', maxCount) => {
  return new Promise((resolve) => {
    const upload = multer({
      storage: multer.diskStorage({
        // 文件存储的目录
        destination(req, file, cb) {
          maxCount = maxCount === 0 ? 0 : req.body.maxCount || 3
          cb(null, join(__dirname, '../../public/' + path))
        },
        // 文件的名字
        filename(req, file, cb) {
          let name = file.originalname.slice(
            0,
            file.originalname.lastIndexOf('.')
          )
          let ext = extname(file.originalname)
          req.coverFile = dayjs().format('YYYYMMDD') + '_' + name + ext
          cb(null, req.coverFile) //名字
        }
      })
    })

    if (maxCount) {
      resolve(upload.array('file', maxCount))
    } else {
      resolve(upload.array('file'))
    }
  })
}

module.exports = upload
