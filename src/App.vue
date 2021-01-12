<template>
  <div id="app">
    <b-navbar toggleable="sm" type="dark" variant="dark" >
      <b-navbar-brand to="/" @click="toHome"> {{ name.toUpperCase() }} </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/training">Тренажер</b-nav-item>
          <b-nav-item to="/multiplication">Умножения</b-nav-item>
        </b-navbar-nav>
         <b-navbar-nav class="ml-auto">
           <li class="nav-link"><b-button variant="light" :to="{ name: 'SignIn' }">Вход</b-button></li>
           <li class="nav-link"><b-button variant="outline-light" :to="{ name: 'SignUp' }">Регистрация</b-button></li>
         </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container" id="main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Abacus MA',
    }
  },
  methods: {
    toHome() {
      this.$router.go()
    }
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
