<template>
  <b-navbar toggleable="sm" type="dark" variant="dark" >
    <b-navbar-brand to="/"> {{ name.toUpperCase() }} </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{name: 'Abacus'}">Тренажер</b-nav-item>
        <b-nav-item to="/multiplication">Умножения</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <li class="nav-link" v-if="isUserLoggedIn"><b-nav-item to="/profile">Профиль</b-nav-item>
        </li>
        <li class="nav-link" v-if="!isUserLoggedIn"><b-button variant="light" :to="{ name: 'SignIn' }">Вход</b-button></li>
        <li class="nav-link" v-if="!isUserLoggedIn"><b-button variant="outline-light" :to="{ name: 'SignUp' }">Регистрация</b-button></li>
        <li class="nav-link" v-if="isUserLoggedIn"><b-button variant="outline-light" @click="logout">Выход</b-button></li>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      name: 'Abacus MA',
    }
  },
  methods: {
    toHome() {
      this.$route.path !== '/' ? this.$router.push('/') : this.$router.go();
    },
    logout() {
      this.$store.dispatch('logoutUser').then(() => {
        this.toHome()
      })
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    userDisplayName() {
      if (this.isUserLoggedIn && this.$store.getters.user.name) {
        return this.$store.getters.user.name
      } else {
        return 'Профиль'
      }
    }
  }
}
</script>

<style scoped>
</style>
