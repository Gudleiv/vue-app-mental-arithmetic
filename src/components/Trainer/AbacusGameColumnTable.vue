<template>
<div>
  <button @click="addAll">All</button>
  <button @click="addNext">Add</button>
  <b-table
      id="table-transition-example"
      striped
      hover
      small
      primary-key="Id"
      :items="numbers"
      :fields="fields"
      :tbody-transition-props="{name: 'list'}"
  >

  </b-table>
</div>
</template>

<script>
export default {
  name: 'AbacusGameColumnTable',
  props: {
    items: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      numbers: [],
      fields: [],
      counter: 0
    }
  },
  computed: {

  },
  methods: {
    addAll() {
      this.numbers = this.items.map((i, idx) => ({
        Id: idx + 1,
        Number: i,
      }))
      this.counter = this.numbers.length
    },
    addNext() {
      if (this.counter >= this.items.length) return
      this.numbers.push({
        Id: this.counter + 1,
        Numbers: this.items[this.counter]
      })
      this.counter++
    }
  }
}
</script>

<style>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>