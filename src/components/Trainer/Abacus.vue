<template>
  <div class="mt-4">
    <b-card>
      <template #header>
        <b-nav card-header tabs>
          <b-nav-item exact-active-class="active" :to="{ name: 'AbacusGame'}">Форсаж</b-nav-item>
          <b-nav-item active-class="active" :to="{ name: 'AbacusColumnGame'}">Столбики</b-nav-item>
          <b-nav-item active-class="active" :to="{ name: 'AbacusExercises'}">Мои примеры</b-nav-item>
        </b-nav>
      </template>
      <router-view></router-view>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'Abacus.vue',
  components: {
  },
}
</script>

<style>
.abacus__tabspacer {
  flex-grow: 1;
}
</style>
