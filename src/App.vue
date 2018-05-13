<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import GoogleMap from "./components/GoogleMap.vue";

  export default {
    components: {
      GoogleMap
    }
  }
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
