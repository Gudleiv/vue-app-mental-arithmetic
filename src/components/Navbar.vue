<template>
  <b-navbar toggleable="md" type="dark" class="navbar" variant="primary">
    <b-navbar-brand to="/"> {{ name.toUpperCase() }} </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item active-class="active" :to="{ name: 'AbacusGame'}">Тренировка</b-nav-item>
        <b-nav-item active-class="active" :to="{ name: 'AbacusExercises'}">Упражнения</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <template v-if="isUserLoggedIn"><b-nav-item  active-class="active" :to="{ name: 'Profile'}">Настройки</b-nav-item>
        </template>
        <li class="nav-link" v-if="isUserLoggedIn === false"><b-button variant="light" :to="{ name: 'SignIn' }">Вход</b-button></li>
        <li class="nav-link" v-if="isUserLoggedIn === false"><b-button variant="outline-light" :to="{ name: 'SignUp' }">Регистрация</b-button></li>
        <template v-if="isUserLoggedIn"><b-nav-item @click="logout">Выход</b-nav-item></template>
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
.navbar {
  padding: 0.1rem 1rem;
}
</style>
