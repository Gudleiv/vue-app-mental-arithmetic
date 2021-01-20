<template>
    <b-row>
      <b-col cols="4" class="px-0">
        <b-navbar>
          <b-nav pills vertical>
            <b-nav-item
                v-for="cat in categories"

                active-class="active"
                :to="{name: 'AbacusExercisesEditor', params: {id: cat.id}}"
                link-classes="categories-list"
            >{{ cat.name }}</b-nav-item>
          </b-nav>
        </b-navbar>
      </b-col>

      <b-col cols="8">
        <transition  name="component-fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
          </transition>
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
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    }
  }
}
</script>

<style>
.nav-link.categories-list {
  padding-top: 2px;
  padding-bottom: 2px;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
