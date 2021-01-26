<template>
  <b-input-group-append>
    <b-button variant="outline-success" @click="$emit('save')"><b-icon scale="0.9" icon="check2"></b-icon> Сохранить</b-button>
    <b-button v-if="delButton" variant="outline-danger" style="border-left:none" size="sm" @click="$emit('del')"><b-icon scale="0.9" icon="trash"></b-icon></b-button>
    <b-button variant="outline-secondary" @click="$emit('cancel')"><b-icon scale="0.9" icon="x"></b-icon></b-button>
  </b-input-group-append>
</template>

<script>
export default {
  props: {
    delButton: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
}
</style>
