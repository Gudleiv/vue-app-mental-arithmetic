<template>
  <b-input-group>
    <b-form-input
        @update="$emit('update', $event)"
        @input="$emit('input', $event)"
        @blur="$emit('blur', $event)"
        v-on="$listeners"
        v-bind="$attrs"
        ref="input"
        :value="value"
        :state="state"
        type="text"
    ></b-form-input>
    <input-control-buttons @save="onSave" @cancel="onCancel" />
  </b-input-group>
</template>

<script>
import InputControlButtons from './InputControlButtons'

export default {
  components: {
    InputControlButtons
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    state: {
      type: [Boolean],
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    onSave() {
      this.$emit('save')
    },
    onCancel() {
      this.$emit('cancel')
    },
    focus() {
      this.$refs.input.focus()
    }
  },
}
</script>

<style scoped>

</style>
