<template>
  <div>
    <div class="row justify-content-center">
      <div class="col my-3" style="max-width:480px">
          <LoginForm/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './SignInLoginForm'

export default {
  components: {
    LoginForm
  }
}
</script>
