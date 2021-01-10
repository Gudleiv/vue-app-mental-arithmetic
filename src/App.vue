<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark">
      <b-navbar-brand to="/"> {{ name.toUpperCase() }} </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Тренажер</b-nav-item>
          <b-nav-item to="/about">Умножения</b-nav-item>
        </b-navbar-nav>
         <b-navbar-nav class="ml-auto">
           <b-nav-item to="/sign">Вход</b-nav-item>
         </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Abacus MA',
    }
  },
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
</style>
