<template>
  <md-editor v-model="data.content" :theme="theme" @on-upload-img="onUploadImg" @on-save="onSave"/>
</template>

<script setup>
import {reactive, ref, watch, onUnmounted} from 'vue';
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

function ctrlSave(e) {
  if (e.ctrlKey && e.code === "KeyS") {
    // 如何获取 md-editor 中的输入内容
    // 阻止默认事件
    showDrawer()
    e.preventDefault()
  }
}

function showDrawer() {
  // 抽屉组件显示出来
  console.log(data)
}

window.addEventListener("keydown", ctrlSave)
onUnmounted(() => {
  window.removeEventListener("keydown", ctrlSave)
})
// ctrl s， v 是md原文，h
const onSave = (md, h) => {
  // console.log(md);
  showDrawer()

  // h.then((html) => {
  //   console.log(html);
  // });
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

