<template>
  <div class="mt-4">
    <b-card no-body>
      <b-tabs card pills>
        <b-tab title="Форсаж" active>
          <b-card-text></b-card-text>
        </b-tab>
        <b-tab title="Столбики">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque neque quasi similique?
        </b-tab>
        <b-tab disabled title-item-class="abacus__tabspacer">
        </b-tab>
        <b-tab title="Мои примеры">
          <abacus-exercises></abacus-exercises>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import AbacusExercises from './AbacusExercises'

export default {
  name: 'Abacus.vue',
  components: {
    AbacusExercises
  },
}
</script>

<style>
.abacus__tabspacer {
  flex-grow: 1;
}
</style>
