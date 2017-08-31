var jimp = require('jimp')
var glob = require('glob-promise')

async function processImage (dir, type, processFunc, progressFunc) {
  var imgList = await glob(`${dir}/*[^${type}].+(jpg|bmp|png)`, { nobrace: true })
  var total = imgList.length
  var finished = 0
  var promises = imgList.map(async image => {
    var rt = ''
    try {
      var fileType = image.split('.').pop()
      var lenna = await jimp.read(image)
      processFunc(lenna)
      lenna.write(`${image}.${type}.${fileType}`)
      finished++
      if (progressFunc) { progressFunc(finished, total) }
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

export async function lowResolutionFy (dir, onProcess) {
  return processImage(dir, 'low', lenna => lenna.resize(1024, jimp.AUTO).quality(60), onProcess)
}

export async function blurFy (dir, onProcess) {
  return processImage(dir, 'blur', lenna => { lenna.blur(Math.round(lenna.bitmap.width / 100)) }, onProcess)
}
