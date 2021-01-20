<template>
  <b-input-group-append>
    <b-button variant="outline-success" @click="$emit('save')"><b-icon font-scale="0.99" icon="check2"></b-icon> Сохранить</b-button>
    <b-button variant="outline-secondary" @click="$emit('cancel')"><b-icon font-scale="0.99" icon="x-circle"></b-icon></b-button>
  </b-input-group-append>
</template>

<script>
export default {
}
</script>
