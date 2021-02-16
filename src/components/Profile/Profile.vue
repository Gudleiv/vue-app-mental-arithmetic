<template>
  <div>
    <div class="row">
      <div class="col-md-2">
        <div class="text-center">
          <b-avatar variant="primary" :text="userDisplayName[0]" size="5rem" class="mt-4"></b-avatar>
          <div class="mx-auto mt-3 font-weight-bold">{{ userDisplayName }}</div>
        </div>
      </div>
      <div class="col-md-10 mt-4">
        <div>
          <b-card no-body>
            <b-tabs pills card>
              <b-tab title="Параметры" active>
                <b-card-text>
                  <profile-manage/>
                </b-card-text>
              </b-tab>
              <b-tab title="Учетная запись">
                <b-card-text>
                  <profile-settings/>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSettings from './ProfileSettings'
import ProfileManage from './ProfileManage'

export default {
  name: 'Profile.vue',
  components: {
    ProfileSettings,
    ProfileManage,
  },
  computed: {
    userDisplayName() {
      return this.$store.getters.user.name
    }
  }
}
</script>

<style scoped>

</style>
