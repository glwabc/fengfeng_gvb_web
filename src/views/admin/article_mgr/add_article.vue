<template>
  <div>
    <GVBArticleModal v-model:visible="visible" @ok="okHandler">

    </GVBArticleModal>
    <md-editor ref="editorRef" v-model="data.content" :theme="theme" @on-upload-img="onUploadImg" @on-save="onSave"/>
  </div>

</template>

<script setup>
import {reactive, ref, watch, onUnmounted, onMounted} from 'vue';
import {useStore} from "@/stores/store";
import MdEditor from 'md-editor-v3';
import {uploadImageApi} from "@/api/image_api";
import 'md-editor-v3/lib/style.css';
import {createArticleApi} from "@/api/article_api";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
import GVBArticleModal from "@/components/admin/gvb_article_modal.vue"

const router = useRouter()
const store = useStore()
const theme = ref("dark")
const visible = ref(false)
const editorRef = ref(null)

async function okHandler(state) {
  Object.assign(data, state)
  let res = await createArticleApi(data)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)

  visible.value = false
  Object.assign(data, _data)
  // 先切换到文章列表
  router.push({
    name: "article_list"
  })
  // 删除添加文章的tab
  store.removeTab({name: "add_article"})
  return
}


onMounted(() => {
  editorRef.value?.focus();
})

const _data = {
  content: "",
  title: "",
  abstract: "",
  banner_id: null,
  category: "",
  link: "",
  source: "",
  tags: [],
}

const data = reactive({
  content: "",
  title: "",
  abstract: "",
  banner_id: null,
  category: "",
  link: "",
  source: "",
  tags: [],
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
  if (data.content.trim() === "") {
    message.error("文章内容不可为空")
    return
  }
  visible.value = true
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

