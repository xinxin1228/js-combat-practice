const fs = require('fs')

/**
 * 删除文件夹所有文件，但不删除原文件夹
 * @param {string} path 路径
 */
const removePath = (path) => {
  const files = fs.readdirSync(path)
  console.log('🚀  ~ 目前删除的文件夹里所包含的文件:', files)

  files.forEach((file) => {
    fs.rmSync(`${path}/${file}`, { recursive: true })
  })

  console.log('🚀  ~ 原文件夹文件已全部删除～')
}

module.exports = removePath
