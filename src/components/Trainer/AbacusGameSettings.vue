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
      <b-form-spinbutton id="input-2" :value="10" inline></b-form-spinbutton>
      </b-form-group>
      <b-form-group
          label-cols-md="5"
          content-cols-md="7"
          label="Разряд:"
          label-for="input-3"
      >
      <b-form-spinbutton disabled id="input-3" inline></b-form-spinbutton>
      </b-form-group>
      <b-form-group
          label-cols-md="5"
          content-cols-md="7"
          label="Интервал:"
          label-for="input-4"
          description="Время отображения каждого числа"
      >
        <b-form-spinbutton min="0.5" max="5" wrap step="0.1" id="input-4" :value="1.5"></b-form-spinbutton>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>


export default {
  name: 'AbacusGameSettings',
  data() {
    return {
      selected: 'a',
      options: [
        { value: 'a', text: 'Маленькие друзья +1' },
        { value: 'b', text: 'Маленькие друзья -1' },
      ]
    }
  },
  methods: {},
}
</script>

<style>

</style>
