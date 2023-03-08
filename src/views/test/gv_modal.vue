<template>
  <a-modal title="xxxx" v-model:visible="props.visible" @cancel="dialogShow"></a-modal>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:visible'])
//组件自己关闭修改父组件传来的值
const dialogShow = () => {
  emit('update:visible', false)
}

</script>

<style scoped>

</style>