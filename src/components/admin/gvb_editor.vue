<template>
  <md-editor ref="editorRef" v-model="content" :theme="theme" @on-upload-img="onUploadImg" @on-save="onSave"/>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {ref, watch, onMounted} from "vue";
import {useStore} from "@/stores/store";
import {uploadImageApi} from "@/api/image_api";

const store = useStore()
const theme = ref("dark")
const props = defineProps({
  content: {
    type: String,
  }
})
const content = ref("")
const editorRef = ref(null)


const emit = defineEmits(['update:content', "onSave"])
watch(content, () => {
  emit('update:content', content.value)
})

watch(() => store.theme, (themeVal) => {
  theme.value = themeVal ? "" : "dark"
}, {immediate: true}) // 初始化就执行回调


const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
      files.map((file) => {
        return uploadImageApi(file)
      })
  );
  callback(res.map((item) => item.data));
};

const onSave = (md, h) => {
  emit("onSave", md)
}

onMounted(() => {
  editorRef.value?.focus();
})

</script>

<style scoped>

</style>