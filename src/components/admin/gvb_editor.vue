<template>
  <md-editor ref="editorRef" v-model="content" :theme="theme" @on-upload-img="onUploadImg" @on-save="onSave"/>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {ref, watch, onMounted} from "vue";
import {useStore} from "@/stores/store";
import {uploadImageApi} from "@/api/image_api";
import {message} from "ant-design-vue";

const store = useStore()
const theme = ref("dark")
const props = defineProps({
  content: {
    type: String,
  }
})
const content = ref("")
const editorRef = ref(null)

function getData() {
  content.value = props.content
}

getData()

const emit = defineEmits(['update:content', "onSave"])
watch(content, () => {
  emit('update:content', content.value)
})
watch(() => props.content, () => {
  content.value = props.content
}, {immediate: true})

watch(() => store.theme, (themeVal) => {
  theme.value = themeVal ? "" : "dark"
}, {immediate: true}) // 初始化就执行回调


const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
      files.map((file) => {
        return uploadImageApi(file)
      })
  );
  let resOne = res[0]
  if (resOne.code) {
    message.error(resOne.msg)
    return
  }
  callback(res.map((item) => {
    return item.data
  }));
};

const onSave = (md, h) => {
  emit("onSave", md)
}

onMounted(() => {
  editorRef.value?.focus();
})

</script>

<style>
.md-editor-dark {
  --md-color: #999;
  --md-hover-color: #bbb;
  --md-bk-color: #141414;
  --md-bk-color-outstand: #111;
  --md-bk-hover-color: #1b1a1a;
  --md-border-color: #2d2d2d;
  --md-border-hover-color: #636262;
  --md-border-active-color: #777;
  --md-modal-mask: #00000073;
  --md-scrollbar-bg-color: #0f0f0f;
  --md-scrollbar-thumb-color: #2d2d2d;
  --md-scrollbar-thumb-hover-color: #3a3a3a;
  --md-scrollbar-thumb-active-color: #3a3a3a;
}

.md-editor {
  height: calc(100vh - 130px);
}
</style>