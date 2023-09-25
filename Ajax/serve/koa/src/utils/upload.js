const path = require('path')
const fs = require('fs')
const dayjs = require('dayjs')

const upload = (ctx, url, maxCount) => {
  url = url || ''
  maxCount = maxCount === 0 ? 0 : +ctx.request.body?.maxCount || 0
  const files = ctx.request.files?.file
  // 上传后的文件可访问路径
  let filePaths = []
  let filePath = {}

  if (Array.isArray(files)) {
    if (!files.length) throw '请选择要上传的文件！'
  } else {
    if (!files) throw '请选择要上传的文件！'
  }

  if (Array.isArray(files)) {
    if (maxCount && files.length > maxCount) {
      throw `最多上传${maxCount}张图片`
    }

    // 单次上传多张
    files.forEach((file) => {
      filePaths.push(writeFile(ctx, file, url))
    })
  } else {
    filePath = writeFile(ctx, files, url)
  }

  return { filePath, filePaths }
}

function writeFile(ctx, file, url) {
  const fileName = `${dayjs().format('YYYYMMDD')}_${file.originalFilename}`
  // 存储路径
  const storagePath = path.resolve(__dirname, `../public/${url}`)

  // 文件夹不存在
  if (!fs.existsSync(storagePath)) fs.mkdirSync(storagePath)

  // 存储路径名称 全程
  const filePath = `${storagePath}/${fileName}`

  const reader = fs.createReadStream(file.filepath)
  const upStream = fs.createWriteStream(filePath)
  reader.pipe(upStream)

  return {
    path: `${ctx.protocol}://${ctx.header.host}/${url}/${fileName}`,
    size: file.size,
    name: file.originalFilename
  }
}

module.exports = upload
