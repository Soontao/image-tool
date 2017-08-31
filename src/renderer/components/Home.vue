<template>
  <div class="c1 unselectable">
    <div class="buttons">
        <el-button :type="choose_btn_type" @click="chooseFile">{{ !folder ? '选择' : folder_name }}</el-button><br>
        <el-button type="plain" :disabled="!folder" @click="lowResolution">低清</el-button><br>
        <el-button type="plain" :disabled="!folder" >模糊</el-button><br>
    </div>
  </div>
</template>

<script>
import { lowResolutionFy } from '../lib/image_process'
import { Button, Loading } from 'element-ui'
const { dialog } = require('electron').remote

export default {
  name: 'home',
  components: {
    'el-button': Button
  },
  data: function () {
    return {
      folder: '',
      processing: false
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
      lowResolutionFy(this.folder)
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
    processing: function (val, oldVal) {
      if (val) {
        Loading.service({ fullscreen: true })
      } else {
        Loading.service().close()
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
