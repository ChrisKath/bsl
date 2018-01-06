<template lang="html">
  <main aria-core="Core Program" id="app-wrap">
    <router-view/>
  </main>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app-wrap {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
