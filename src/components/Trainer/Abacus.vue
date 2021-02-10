<template>
  <div class="mt-4">
    <transition name="component-fade" mode="out-in">
    <router-view></router-view>
    </transition>
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
.component-fade-enter-active, .component-fade-leave-active {
  transition: all .2s ease;
}
.component-fade-enter, .component-fade-leave-to
{
  opacity: 0;
  transform: translateY(6px);
}
</style>
