<template>
<div class="col-md-9 mx-auto d-flex" :class="{'column-table-space': !ended}">
  <b-table
      id="column-table"
      ref="table"
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
      counter: 0,
      ended: false,
    }
  },
  computed: {
    rowSum() {
      let acc = 0
      return this.items.map((v, idx) => {
        if (idx === this.items.length - 1) return '?' //Скрыть ответ
        return acc += v
      })
    }
  },
  methods: {
    addAll() {
      while (this.counter < this.items.length) {
        this.add()
      }
    },
    add() {
      if (this.ended) return
      this.numbers.push({
        N: this.counter + 1,
        Number: {aboveZero: this.items[this.counter] >= 0, n: Math.abs(this.items[this.counter])},
        Sum: this.rowSum[this.counter],
      })
      this.counter++
      if (this.counter >= this.items.length) {
        this.$emit('end')
        this.ended = true
      }
    },
    next() {
      this.add()
      const scroll = this.$refs.table.$el.scrollHeight
      // const scroll = this.$refs.table.$el.offsetHeight + this.$refs.table.$el.offsetTop
      this.$nextTick(() => {
        const row = this.$refs.table.$el.children[1].children[this.counter - 1]
        row.scrollIntoView({
          block: 'center',
        });
      })

      window.scrollTo(0, scroll)

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
}
.column-table-list-enter, .column-table-list-leave-to {
}

.column-table-thead {
  display: none;
}

.column-table-td-sum:hover {
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
  width: 60%;
  background-color: rgba(22, 90, 172, 0.25);
  font-family: 'Nanum Gothic Coding', monospace;
}

.column-table-td-number-wrap {
  width: 100%;
  display: flex;
  padding: 0 5%;

}

.column-table-td-number-sign {
  width: 25%;
  text-align: center;
}

.column-table-td-number-n {

}

.column-table-td-sum {
  opacity: 0;
  width: 25%;
}

.column-table-space {
  padding-bottom: 75vh;
}
</style>