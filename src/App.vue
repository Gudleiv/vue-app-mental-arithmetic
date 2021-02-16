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

<style lang="scss">
$primary: #165aac;
$success: #187014;
$danger: #861c1c;
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

body {
  overflow-y: scroll;
}
</style>
