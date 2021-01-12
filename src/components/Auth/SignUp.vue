<template>
  <div>
    <div class="row justify-content-center">
      <div class="col my-3" style="max-width:480px">
          <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from './SignUpRegisterForm'

export default {
  components: {
    RegisterForm
  }
}
</script>
