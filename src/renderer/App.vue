<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import Home from '@/components/Home'

export default {
  name: 'image',
  components: {
    home: Home
  }
}
</script>

<style>
#app {
  width: 200px;
  height: 325px;
}
</style>
