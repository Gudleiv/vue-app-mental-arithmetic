<template>
  <div class="mt-2">
    <div v-if="exercises.length">
      <b-input-group
          v-for="ex in exercises"
          class="exercises-list"
      >
        <b-input-group-prepend is-text>
          <b-form-checkbox :checked="ex.enabled" @change="toggleExercise(ex.id, $event)" switch class="mr-n2">
          </b-form-checkbox>
        </b-input-group-prepend>
        <b-form-input
            :value="ex.data"
            disabled
        ></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-danger" @click="deleteExercise(ex.id)"><b-icon icon="x-circle"></b-icon></b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div v-else>
      <div class="text-center mb-3 h5">В данной категории нет упражнений</div>
    </div>
    <input-control
        v-if="addToggle"
        autocomplete="off"
        v-model="$v.newExercise.$model"
        @blur="$v.newExercise.$touch"
        @cancel="cancelExercise"
        @save="addExercise"
        :state="validate('newExercise')"
    />
    <div v-else class="text-center">
      <b-button variant="success" @click="addToggle = !addToggle">
        <b-icon icon="plus-circle"></b-icon> Добавить
      </b-button>
    </div>


  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validateState } from '@/utils'
import InputControl from '@/components/Controls/InputControl'

export default {
  created() {
    this.validate = validateState(this.$v)
  },
  props: ['id'],
  components: {
    InputControl,
  },
  data() {
    return {
      addToggle: false,
      newExercise: '',
    }
  },
  validations: {
    newExercise: {
      required,
      numeric: (val) => /^[0-9,-]*$/iu.test(val),
    },
  },
  methods: {
    cancelExercise() {
      this.newExercise = ''
      this.$v.newExercise.$reset()
      this.addToggle = false
    },
    addExercise() {
      if (this.newExercise && !this.$v.newExercise.invalid) {
        this.$store.dispatch('addExercise', {
          catId: this.id,
          data: this.newExercise
        })

        this.cancelExercise()
      } else {
        this.$v.newExercise.$touch()
      }

    },
    toggleExercise(exerciseId, event) {
      this.$store.dispatch('toggleExercise', {
        catId: this.id,
        id: exerciseId,
        status: event
      })
    },
    deleteExercise(exerciseId) {
      this.$store.dispatch('deleteExercise', {
        catId: this.id,
        id: exerciseId
      })
    },
    onChangeExercise(value) {
      console.log(value)
    },
  },
  computed: {
    exercises() {
      return this.$store.getters.exercises(this.id)
    },
  },
}
</script>

<style>
.input-group.exercises-list {
  margin-bottom: 0.4rem;
}
</style>
