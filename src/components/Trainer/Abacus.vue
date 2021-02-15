<template>
  <div class="mt-4">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Abacus',
  created() {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchGameSettings')
  }
}
</script>

<style>
</style>
