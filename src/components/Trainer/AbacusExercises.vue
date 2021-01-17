<template>
    <b-row>
      <b-col cols="4" class="px-0">
        <b-navbar>
          <b-nav pills vertical>
            <b-nav-item v-for="i in 10" link-classes="exercises-list" :active="i===1">Маленькие друзья {{ i }}</b-nav-item>
          </b-nav>
        </b-navbar>
      </b-col>

      <b-col cols="8">
        <abacus-exercises-editor></abacus-exercises-editor>
      </b-col>
    </b-row>
</template>

<script>
import AbacusExercisesEditor from './AbacusExercisesEditor'

export default {
  components: {
    AbacusExercisesEditor
  },
  data() {
    return {

    }
  }
}
</script>

<style>
.nav-link.exercises-list {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
