<template>
  <div>
    <b-card header="Звук">
      <b-form-group
          label-cols-md="5"
          content-cols-md="7"
          label="Язык озвучки:"
          label-for="input-1"
      >
        <b-form-select id="input-1" v-model="lang" :options="languages"></b-form-select>
      </b-form-group>
    </b-card>
    <b-card header="Упражнения" class="mt-4">
      <b-form class="d-flex flex-column">
        <b-button class="mb-3" size="sm" variant="info" @click="addDefaultExercises">Добавить стандартные упражнения
        </b-button>
        <b-button variant="danger" size="sm" @click="resetExercises">Сбросить все упражнения</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      languages: [
        {value: 'ru', text: 'Русский'},
        {value: 'uk', text: 'Английский'}
      ]
    }
  },
  computed: {
    lang: {
      get() {
        return this.$store.getters.getGameSetting('language')
      },
      set(nV) {
        this.$store.dispatch('updateGameSettings', { language: nV})
      }
    }
  },
  methods: {
    addDefaultExercises() {
      this.addDefaultExercisesModal()
          .then(confirm => {
            if (confirm) console.log('Готово!')
          })
    },
    addDefaultExercisesModal() {
      return this.$bvModal.msgBoxConfirm(`Добавить стандартные упражнения?`, {
        title: `Стандартные упражнения`,
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'info',
        okTitle: 'Добавить',
        cancelTitle: 'Отмена',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
          .then(value => {
            return value
          })
          .catch(err => {
          })
    },
    resetExercises() {
      this.resetExercisesModal()
          .then(confirm => {
            if (confirm) console.log('Готово!')
          })
    },
    resetExercisesModal() {
      return this.$bvModal.msgBoxConfirm(`Все ваши упражнения и категории будут удалены, вы уверены?`, {
        title: `Сброс упражнений`,
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Сбросить',
        cancelTitle: 'Отмена',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
          .then(value => {
            return value
          })
          .catch(err => {
          })
    },
  },
}
</script>

<style scoped>
</style>
