<template>
<div>
  <b-button class="mr-1" @click="addAll">All</b-button>
  <b-button @click="addNext">Add</b-button>
  <b-table
      hover
      borderless
      head-variant="primary"
      small
      fixed
      primary-key="N"
      :items="numbers"
      :fields="fields"
      :tbody-transition-props="{name: 'column-table-list'}"
      :tbody-tr-class="rowClass"
      thead-class="column-table-thead"
  >
    <template #cell(Number)="data">
      <div class="column-table-td-number-wrap">
      <div class="column-table-td-number-sign">{{ data.value.aboveZero ? '' : '-' }}</div>
      <div class="column-table-td-number-n">{{ data.value.n }}</div>
      </div>
    </template>
  </b-table>
</div>
</template>

<script>
export default {
  name: 'AbacusGameColumnsOutput',
  props: {
    items: {
      type: Array,
      default: [],
    }
  },
  data() {
    return {
      numbers: [],
      fields: [
          { key: 'N', label: '', tdClass: 'column-table-td column-table-td-n'},
          { key: 'Number', tdClass: 'column-table-td column-table-td-number'},
          { key: 'Sum', tdClass: 'column-table-td column-table-td-sum'},
      ],
      counter: 0
    }
  },
  computed: {
    rowSum() {
      const array = []
      this.items.reduce((acc, cv, idx) => {
        const res = acc + cv
        array.push(res)
        return res
      }, 0)
      return array
    }
  },
  methods: {
    addAll() {
      this.numbers = this.items.map((i, idx) => {
        return {
          N: idx + 1,
          Number: {aboveZero: i >= 0, n: Math.abs(i)},
          Sum: this.rowSum[idx],
        }
      })
      this.counter = this.numbers.length
    },
    addNext() {
      if (this.counter >= this.items.length) return
      this.numbers.push({
        N: this.counter + 1,
        Number: this.items[this.counter],
        Sum: this.rowSum[this.counter],
      })
      this.counter++
    },
    rowClass(item, type) {
      if (item.N === this.items.length) return 'column-table-tr column-table-tr-last'
      else return 'column-table-tr'
    }
  }
}
</script>

<style>
.column-table-list-enter-active, .column-table-list-leave-active {
  transition: all 0.2s;
}
.column-table-list-enter, .column-table-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.column-table-thead {
  display: none;
}

.column-table-tr:hover .column-table-td-sum{
  opacity: 1;
}

.column-table-tr-last {
  box-shadow: 1px 1px 3px lightgray;
}

.column-table-td {
  vertical-align: middle !important;
  text-align: center;
}

.column-table-td-n {
  text-align: center;
  opacity: 0.33;
}

.column-table-td-number {
  font-size: 2rem;
  width: 45%;
  background-color: rgba(128, 180, 200, 0.35);
  font-family: 'Nanum Gothic Coding', monospace;
}

.column-table-td-number-wrap {
  display: flex;
}

.column-table-td-number-sign {

}

.column-table-td-number-n {

}

.column-table-td-sum {
  opacity: 0;
}
</style>