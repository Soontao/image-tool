<template>
  <div class="c1 unselectable">
    <div class="buttons">
      <el-button :type="choose_btn_type" @click="chooseFile">{{ !folder ? '选择' : folder_name }}</el-button><br>
      <el-button type="plain" :disabled="!folder" @click="lowResolution">低清</el-button><br>
      <el-button type="plain" :disabled="!folder" @click="blur">模糊</el-button>
    </div>
  </div>
</template>

<script>
import { lowResolutionFy, blurFy } from '../lib/image_process'
import { Button, Loading, Row } from 'element-ui'
import { remote } from 'electron'
const { dialog } = remote
const window = remote.getCurrentWindow()
const appTitle = window.getTitle()

export default {
  name: 'home',
  components: {
    'el-button': Button,
    'el-row': Row
  },
  data: function () {
    return {
      folder: '',
      processing: false,
      progress: 0
    }
  },
  computed: {
    choose_btn_type: function () {
      return !this.folder ? 'success' : 'danger'
    },
    folder_name: function () {
      if (this.folder) {
        // only for windows
        var fName = this.folder.split('\\').pop()
        if (fName.length > 20) {
          fName = fName.substr(0, 17) + '...'
        }
        return fName
      }
    }
  },
  methods: {
    chooseFile () {
      if (this.folder) {
        this.folder = ''
        return
      }
      var folders = dialog.showOpenDialog({ properties: ['openDirectory'] })
      if (folders && folders.length > 0) {
        this.folder = folders[0]
      }
    },
    lowResolution () {
      this.processing = true
      lowResolutionFy(this.folder, (finished, total) => { this.progress = finished / total })
        .then(() => {
          this.processing = false
        })
        .catch(err => {
          this.processing = false
          this.$message(err)
        })
    },
    blur () {
      this.processing = true
      blurFy(this.folder, (finished, total) => { this.progress = finished / total })
        .then(() => {
          this.processing = false
        })
        .catch(err => {
          this.processing = false
          this.$message(err)
        })
    }
  },
  watch: {
    progress: function (val, oldVal) {
      window.setTitle(`processing ${(val * 100).toFixed(0)} %`)
    },
    processing: function (val, oldVal) {
      if (val) {
        this.progress = 0
        Loading.service({ fullscreen: true, text: 'Processing' })
      } else {
        Loading.service().close()
        window.setTitle(appTitle)
      }
    }
  }
}
</script>

<style scoped>
.buttons {
  display: table-cell;
  vertical-align: middle;
}

.c1 {
  width: 200px;
  margin: 0 auto;
  text-align: center;
  height: 325px;
  display: table;
}

.el-button {
  margin: 5px;
}

/* 不允许被选中 */
.unselectable {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>
