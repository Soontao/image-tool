# image tool

> 一个处理图像的小工具, 基于Electron, Vue.js和Element UI

see video ? [click here](https://res.cloudinary.com/digf90pwi/video/upload/v1504158510/img-tool_zlfmxb.mp4)

## download

download installer from [here](https://github.com/Soontao/image-tool/releases/tag/v0.0.0)

## usage

1. 选择一个文件夹
1. 选择低清或者模糊
1. 处理后的文件会放在同一路径下

## other

* 支持jpg, png及bmp图像, 不会递归处理子文件夹
* 低清, 会把高清图片裁剪至1024宽度，高度自适应
* 模糊, 会以1%宽度为半径模糊

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```
