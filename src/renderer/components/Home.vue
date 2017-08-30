<template>
  <div class="c1">
    <div class="buttons">
      <el-button type="success" @click="choosefile">选择文件夹</el-button><br>
      <el-button type="plain">降低分辨率</el-button><br>
      <el-button type="plain">马赛克</el-button><br>
      <el-button type="plain">打包ZIP</el-button>
    </div>
  </div>
</template>

<script>
const { dialog } = require('electron').remote

export default {
  name: 'home',
  components: {},
  methods: {
    choosefile () {
      dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] })
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
</style>
