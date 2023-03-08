<template>
  <div>
    <a-modal title="完善文章信息" v-model:visible="visible" @ok="okHandler">
      <a-form
          :model="data"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
      >
        <a-form-item label="文章标题" name="title" has-feedback
                     :rules="[{ required: true, message: '请输入文章标题' ,trigger: 'blur'}]">
          <a-input v-model:value="data.title" placeholder="文章标题"/>
        </a-form-item>
        <a-form-item label="文章简介">
          <a-textarea v-model:value="data.abstract" :auto-size="{ minRows: 2, maxRows: 5 }" placeholder="文章简介"/>
        </a-form-item>
        <a-form-item label="文章分类">
          <a-auto-complete
              v-model:value="data.category"
              :options="initData.categoryList"
              placeholder="文章分类"
          />
        </a-form-item>
        <a-form-item label="文章标签">
          <a-select
              class="gvb_select"
              v-model:value="data.tags"
              allowClear
              mode="tags"
              :options="initData.tagList"
              placeholder="文章标签"
          ></a-select>
        </a-form-item>
        <a-form-item label="文章封面">
          <a-select
              ref="select"
              v-model:value="data.banner_id"
              placeholder="选择banner"
          >
            <a-select-option :value="item.id" v-for="item in initData.bannerList" :key="item.id">
              <img :src="item.path" alt="" height="30" style="border-radius: 5px; margin-right: 10px">
              <span>{{ item.name }}</span>
            </a-select-option>
            <template #tagRender="{ value: val, label, closable, onClose, option }">
              <img :src="getLabel(label)" height="30" style="border-radius: 5px; margin-right: 5px"/>
            </template>
          </a-select>
        </a-form-item>
        <a-form-item label="原文地址">
          <a-input v-model:value="data.link" placeholder="原文地址"/>
        </a-form-item>
        <a-form-item label="文章来源">
          <a-input v-model:value="data.source" placeholder="文章来源"/>
        </a-form-item>

      </a-form>
    </a-modal>
    <md-editor ref="editorRef" v-model="data.content" :theme="theme" @on-upload-img="onUploadImg" @on-save="onSave"/>
  </div>

</template>

<script setup>
import {reactive, ref, watch, onUnmounted, onMounted} from 'vue';
import {useStore} from "@/stores/store";
import MdEditor from 'md-editor-v3';
import {imageNameListApi, uploadImageApi} from "@/api/image_api";
import 'md-editor-v3/lib/style.css';
import {getTagNameListApi} from "@/api/tag_api";
import {getCategoryListApi, createArticleApi} from "@/api/article_api";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";

const router = useRouter()
const store = useStore()
const theme = ref("dark")
const visible = ref(false)
const formRef = ref(null)
const editorRef = ref(null)
const initData = reactive({
  tagList: [],
  categoryList: [],
  bannerList: [],
})

// 选中之后的回显
function getLabel(label) {
  return label[0].props.src
}

async function getData() {
  let t1 = await getTagNameListApi()
  initData.tagList = t1.data
  let t2 = await getCategoryListApi()
  initData.categoryList = t2.data
  let t3 = await imageNameListApi()
  const list = t3.data
  initData.bannerList = list
  // 随机选择一张封面
  const banner = list[Math.floor(Math.random() * list.length)]
  data.banner_id = banner.id
}

async function okHandler() {
  try {
    await formRef.value.validate()
  } catch (e) {
    return
  }
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

getData()

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

