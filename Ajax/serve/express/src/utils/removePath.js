const { rmSync, readdirSync } = require('fs')

/**
 * 删除文件夹的所有内容，但不删除原文件夹
 * @param {string} pathUrl 删除的路径
 */
const removeFiles = (pathUrl) => {
  const files = readdirSync(pathUrl)
  console.log('🚀  ~ 目前删除的文件夹里所包含的文件:', files)

  files.forEach((file) => {
    const filePath = `${pathUrl}/${file}`
    rmSync(filePath)
  })

  console.log('🚀  ~ 原文件夹文件已全部删除～')
}

module.exports = removeFiles
