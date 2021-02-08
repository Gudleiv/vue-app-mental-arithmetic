<template>
  <div>
    <b-form>
      <b-form-group
          label-cols-md="5"
          content-cols-md="7"
          label="Категория упражнений:"
          label-for="input-1"
      >
        <b-form-select id="input-1" v-model="selected" :options="options"></b-form-select>
      </b-form-group>
      <b-form-group
          label-cols-md="5"
          content-cols-md="7"
          label="Количество чисел:"
          label-for="input-2"
      >
        <b-form-spinbutton @change="updateSettings" wrap v-model="amountOfNumbers" id="input-2"
                           inline></b-form-spinbutton>
      </b-form-group>
      <b-form-group
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
    this.$store.dispatch('fetchGameSettings')
    this.timeInterval = this.settings.timeInterval
    this.amountOfNumbers = this.settings.amountOfNumbers
    this.digitNumber = this.settings.digitNumber
  },
  name: 'AbacusGameSettings',
  data() {
    return {
      selected: 'a',
      options: [
        {
          value: 'a',
          text: 'Маленькие друзья +1',
        },
        {
          value: 'b',
          text: 'Маленькие друзья -1',
        },
      ],
      timeInterval: '',
      amountOfNumbers: '',
      digitNumber: '',
      mute: false,
    }
  },
  computed: {
    settings() {
      return this.$store.getters.getGameSettings
    },
  },
  methods: {
    updateSettings() {
      const settings = {
        amountOfNumbers: this.amountOfNumbers,
        timeInterval: this.timeInterval,
        digitNumber: this.digitNumber,
      }
      this.$store.dispatch('updateGameSettings', settings)
    },
  },
}
</script>

<style>

</style>
