var jimp = require('jimp')
var glob = require('glob-promise')

export async function lowResolutionFy (dir) {
  var imageList = await glob(`${dir}/*[^low].+(jpg|bmp|png)`, { nobrace: true })
  var promises = imageList.map(async image => {
    var rt = ''
    try {
      var lenna = await jimp.read(image)
      var fileType = image.split('.').pop()
      lenna.resize(1024, jimp.AUTO).quality(60)
      lenna.write(`${image}.low.${fileType}`)
      rt = 'ok'
    } catch (error) {
      rt = 'err'
    }
    return {
      filename: image,
      status: rt
    }
  })
  return Promise.all(promises)
}
