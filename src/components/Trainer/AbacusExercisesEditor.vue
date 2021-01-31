<template>
  <div class="mt-2">
    <div v-if="exercises.length">
      <abacus-exercises-item
          v-for="ex in exercises"
          :key="ex.id"
          :exercise="ex"
          @toggle="switchExercise(ex.id, $event)"
          @update="updateExercise(ex.id, $event)"
          @del="deleteExercise(ex.id)"
      ></abacus-exercises-item>
    </div>
    <div v-else>
      <div class="text-center mb-3 h5">В данной категории нет упражнений</div>
    </div>
    <input-control
        v-if="addForm"
        :key="catId"
        autocomplete="off"
        ref="newExercise"
        v-model.lazy="$v.newExercise.$model"
        @blur="$v.newExercise.$touch"
        @cancel="hideAddForm"
        @save="addExercise"
        @keydown.esc="hideAddForm"
        @keydown.enter="addExercise"
        :state="validate('newExercise')"
    />
    <div v-else class="text-center">
      <b-button size="sm" variant="outline-success" @click="showAddForm">
        <b-icon icon="plus" style="height:16px" scale="1.5"></b-icon> Добавить пример
      </b-button>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validateState } from '@/utils'
import InputControl from '@/components/Controls/InputControl'
import AbacusExercisesItem from './AbacusExercisesItem'

export default {
  created() {
    this.validate = validateState(this.$v)
  },
  props: {
    catId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    InputControl,
    AbacusExercisesItem,
  },
  data() {
    return {
      addForm: false,
      newExercise: '',
      currentExercise: '',
      exList: []
    }
  },
  validations: {
    newExercise: {
      required,
      numeric: (val) => /^([-]?[\d]+[,]?)+$/.test(val),
    }
  },
  methods: {
    hideAddForm() {
      this.addForm = false
      this.newExercise = ''
      this.$v.newExercise.$reset()
    },
    showAddForm() {
      this.addForm = true
      this.newExercise = ''
      this.$v.newExercise.$reset()
      this.$nextTick(() => this.$refs['newExercise'].focus())
    },
    addExercise() {
      if (this.newExercise && !this.$v.newExercise.$invalid) {
        this.$store.dispatch('addExercise', {
          catId: this.catId,
          data: this.newExercise
        })
        this.hideAddForm()
      } else {
        this.$v.newExercise.$touch()
      }
    },
    updateExercise(id, event) {
      this.$store.dispatch('updateExercise', {
        catId: this.catId,
        exercise: {
          id,
          data: event
        }
      })
    },
    switchExercise(id, event) {
      this.$store.dispatch('updateExercise', {
        catId: this.catId,
        exercise: {
          id,
          enabled: event
        }
      })
    },
    deleteExercise(id) {
      this.confirmModal().then(confirm => {
        if (confirm) {
          this.$store.dispatch('deleteExercise', {
            id,
            catId: this.catId
          })
        }
      })
    },
    showModal() {
      this.$refs['exercises-modal'].show()
      this.newName = this.currentCategory.name
    },
    shownModal() {
      this.$refs['exercises-formula-input'].focus()
    },
    hideModal() {
      this.$refs['exercises-modal'].hide()
      this.newName = ''
    },
    confirmModal() {
      return this.$bvModal.msgBoxConfirm(`Вы действительно хотите удалить упражнение?`, {
        title: `Удаление упражнения`,
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'OK',
        cancelTitle: 'Cancel',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
          .then(value => {
            return value
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
  computed: {
    exercises() {
      return this.$store.getters.exercises(this.catId)
    },
  },
  watch: {
    catId() {
      this.hideAddForm()
    }
  }
}
</script>

<style>
</style>
