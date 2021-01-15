<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template #head(age)="data">
        <span>{{ data = 'Возраст' }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ['name', 'email', 'date', 'isActive'],
      items: [
        {
          name: 'Алексей',
          email: 'test@mail.ru',
          date: new Date(),
          isActive: false
        },
        {
          name: 'Robert Dwn Junior',
          email: 'example@mail.com',
          isActive: true
        },
        {
          name: 'Михаил',
          email: 'test@mail.ru',
          isActive: true
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
