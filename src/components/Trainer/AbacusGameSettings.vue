<template>
  <div>
    <b-form>
      <b-form-group
          label-cols-md="5"
          content-cols-md="7"
          label="Категория упражнений:"
          label-for="input-1"
      >
        <b-form-select id="input-1" @change="updateSettings" :disabled="!categoryId" v-model="categoryId" :options="categoriesList"></b-form-select>
      </b-form-group>
      <b-form-group
          label-cols-md="5"
          content-cols-md="7"
          label="Количество чисел:"
          label-for="input-2"
      >
        <b-form-spinbutton @change="updateSettings" min="2" wrap v-model="amountOfNumbers" id="input-2"
                           inline></b-form-spinbutton>
      </b-form-group>
      <b-form-group
          v-if="false"
          label-cols-md="5"
          content-cols-md="7"
          label="Разряд:"
          label-for="input-3"
      >
        <b-form-spinbutton wrap min="1" max="3" @change="updateSettings" id="input-3" v-model="digitNumber"
                           inline></b-form-spinbutton>
      </b-form-group>
      <b-form-group
          label-cols-md="5"
          content-cols-md="7"
          label="Интервал:"
          label-for="input-4"
          :description="`Время отображения каждого числа: ${timeInterval} с`"
      >
        <b-form-input type="range" @change="updateSettings" min="0.7" max="10" wrap step="0.1" id="input-4"
                      v-model="timeInterval"></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>


export default {
  created() {
    this.timeInterval = this.settings.timeInterval
    this.amountOfNumbers = this.settings.amountOfNumbers
    this.digitNumber = this.settings.digitNumber
    this.categoryId = this.settings.categoryId
  },

  name: 'AbacusGameSettings',
  data() {
    return {
      categoryId: '',
      timeInterval: '',
      amountOfNumbers: '',
      digitNumber: '',
    }
  },
  computed: {
    settings() {
      return this.$store.getters.getGameSettings
    },
    categoriesList() {
      if (this.$store.getters.categoriesListWithExercises !== null) {
        const list = this.$store.getters.categoriesListWithExercises.map(cat => {
          return {
            value: cat.id,
            text: cat.name
          }
        })
        if (!list.some(c => c.value === this.categoryId)) {
          this.categoryId = list[0].value
          this.updateSettings()
        }
        return list
      } else {
        this.categoryId = ''
        return [{
          value: '',
          text: 'Нет упражнений'
        }]
      }
    }
  },
  methods: {
    updateSettings() {
      const settings = {
        amountOfNumbers: this.amountOfNumbers,
        timeInterval: this.timeInterval,
        digitNumber: this.digitNumber,
        categoryId: this.categoryId
      }
      this.$store.dispatch('updateGameSettings', settings)
    },
  }
}
</script>

<style>

</style>
