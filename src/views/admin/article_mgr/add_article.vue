<template>
  <md-editor v-model="data.content" :theme="theme" @on-upload-img="onUploadImg"/>
</template>

<script setup>
import {reactive, ref, watch} from 'vue';
import {useStore} from "@/stores/store";
import MdEditor from 'md-editor-v3';
import {uploadImageApi} from "@/api/image_api";
import 'md-editor-v3/lib/style.css';

const store = useStore()
const theme = ref("dark")
import axios from "axios";

const data = reactive({
  content: "hello fengfeng",
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

