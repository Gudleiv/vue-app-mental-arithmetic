<template>
  <div id="app">
    <Navbar />
    <div class="container" id="main">
      <router-view />
    </div>
    <ErrorMessage />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import ErrorMessage from '@/components/ErrorMessage'

export default {
  components: {
    Navbar,
    ErrorMessage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  background-color: #29772b;
}

body {
  overflow-y: scroll;
}

</style>
