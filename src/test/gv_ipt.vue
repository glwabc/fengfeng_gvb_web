<template>
  <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" placeholder="输入内容"/>
</template>

<script setup>
const props = defineProps(['modelValue'])
defineEmits(['update:modelValue'])
console.log(props.modelValue)
</script>

<style scoped>

</style>