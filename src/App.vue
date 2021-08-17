<template>
  <lana />
</template>

<script>
import Lana from './components/Lana.vue'

export default {
  name: 'App',
  components: {
    Lana
  }
}
</script>

<style lang="scss">
@import '~bulma/bulma.sass';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
