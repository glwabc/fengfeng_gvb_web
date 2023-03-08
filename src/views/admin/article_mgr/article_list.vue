<template>
  <div>
    <GVBArticleModal
        v-if="data.editVisible"
        v-model:visible="data.editVisible"
        :state="data.state"
        :init-data-state="initData"
        is-edit
        @ok="editArticleOK"></GVBArticleModal>
    <GVBTable
        :columns="data.columns"
        base-url="/api/articles"
        like-title="搜索文章标题"
        ref="gvbTable"
        default-delete
    >
      <template #add>
        <a-button type="primary" @click="addArticle">添加</a-button>
      </template>
      <template #edit="{record}">
        <a-button type="primary" @click="showEditArticleModal(record)">编辑</a-button>
        <a-button type="primary" @click="showEditArticleContentModal(record)">正文编辑</a-button>
      </template>
      <template #cell="{column, record, index }">
        <template v-if="column.key === 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'title'">
          <span class="gvb_article_title" v-html="record.title"></span>
        </template>
        <template v-if="column.key === 'banner_url'">
          <img :src="record.banner_url" alt="" height="60" style="border-radius: 5px">
        </template>
        <template v-if="column.key === 'data'">
          <div class="gvb_article_data">
            <span><i class="fa fa-eye"></i>{{ record.look_count }}</span>
            <span><i class="fa fa-thumbs-o-up"></i>{{ record.digg_count }}</span>
            <span><i class="fa fa-comment-o"></i>{{ record.comment_count }}</span>
            <span><i class="fa fa-star-o"></i>{{ record.collects_count }}</span>
          </div>
        </template>
        <template v-if="column.key === 'abstract'">
          <span class="gvb_article_abstract">{{ record.abstract }}</span>
        </template>
        <template v-if="column.key === 'tags'">
          <div class="gvb_article_tags">
            <a-tag :color="getColor(i)" v-for="(item, i) in record.tags" :key="i">{{ item }}</a-tag>
          </div>
        </template>
      </template>

      <template #filters>
        <a-select
            class="gvb_select"
            v-model:value="tag"
            style="width: 200px"
            allowClear
            @change="onFilter"
            :options="initData.tagOptions"
            placeholder="筛选文章标签"
        ></a-select>
        <a-select
            class="gvb_select"
            v-model:value="category"
            style="width: 200px"
            allowClear
            @change="onFilter"
            :options="initData.categoryOptions"
            placeholder="筛选文章分类"
        ></a-select>
      </template>
    </GVBTable>
  </div>
</template>

<script setup>
import {getTagNameListApi} from "@/api/tag_api";
import {getCategoryListApi, updateArticleApi} from "@/api/article_api";
import {imageNameListApi} from "@/api/image_api";
import {reactive, ref} from "vue";
import GVBTable from "@/components/admin/gvb_table.vue"
import {useRouter} from "vue-router";
import {useStore} from "@/stores/store";
import GVBArticleModal from "@/components/admin/gvb_article_modal.vue"
import {message} from "ant-design-vue";

const store = useStore()
const router = useRouter()
const tag = ref(null)
const category = ref(null)
const gvbTable = ref(null)

const initData = reactive({
  tagOptions: [],
  categoryOptions: [],
  imageOptions: [],
})

const data = reactive({
  list: [
    {
      "abstract": "需要一个全局变量，用于保存配置文件，存放在global目录下",
      "banner_id": 3,
      "banner_url": "uploads/file/29.jpg",
      "category": "p1",
      "collects_count": 0,
      "comment_count": 0,
      "created_at": "2023-02-24 21:21:29",
      "digg_count": 0,
      "id": "P46Vg4YB6uoytGZA-bE7",
      "look_count": 0,
      "tags": [
        "golang",
        "后端",
        "教程",
      ],
      "title": "后端项目搭建",
      "updated_at": "2023-02-24 21:31:13",
      "user_avatar": "/uploads/avatar/default.png",
      "user_id": 1,
      "user_nick_name": "admin"
    },
  ],
  columns: [
    // {title: 'id', dataIndex: 'id', key: 'id'},
    {title: 'Index', dataIndex: 'index', key: 'index'},
    {title: '文章标题', dataIndex: 'title', key: 'title'},
    {title: '文章分类', dataIndex: 'category', key: 'category'},
    {title: '文章简介', dataIndex: 'abstract', key: 'abstract'},
    {title: '作者', dataIndex: 'user_nick_name', key: 'user_nick_name'},
    {title: '封面', dataIndex: 'banner_url', key: 'banner_url'},
    {title: '文章数据', dataIndex: 'data', key: 'data'},
    // {title: '浏览量', dataIndex: 'look_count', key: 'look_count'},
    // {title: '点赞', dataIndex: 'digg_count', key: 'digg_count'},
    // {title: '评论', dataIndex: 'comment_count', key: 'comment_count'},
    // {title: '收藏', dataIndex: 'collects_count', key: 'collects_count'},
    {title: '标签', dataIndex: 'tags', key: 'tags'},
    {title: '发布时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
  editVisible: false,
  state: {
    title: "",
    abstract: "",
    banner_id: null,
    category: "",
    link: "",
    source: "",
    tags: [],
  },
  editID: "",
})

function showEditArticleModal(record) {
  data.state.title = record.title
  data.state.abstract = record.abstract
  data.state.banner_id = record.banner_id
  data.state.category = record.category
  data.state.link = record.link
  data.state.source = record.source
  data.state.tags = record.tags
  data.editID = record.id
  data.editVisible = true
}

function showEditArticleContentModal(record) {
  router.push({
    name: "edit_article",
    params: {
      id: record.id
    },
    query: {
      title: record.title
    }
  })
  store.addTab({
    name: "edit_article",
    title: "编辑文章",
    params: {
      id: record.id
    },
    query: {
      title: record.title
    }
  })
}

const colorList = ["red", "blue", "green", "purple", "cyan", "orange", "pink"]

function getColor(index) {
  return colorList[index]
}

async function editArticleOK(state) {
  let res = await updateArticleApi(data.editID, state)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  data.editVisible = false
  gvbTable.value.ExportList()


}

async function addArticle() {
  await router.push({
    name: "add_article"
  })
  store.addTab({
    "name": "add_article",
    "title": "添加文章"
  })

}

function onFilter() {
  gvbTable.value.ExportList({tag: tag.value, key: category.value})
}

async function getData() {
  let t1 = await getTagNameListApi()
  initData.tagOptions = t1.data
  let t2 = await getCategoryListApi()
  initData.categoryOptions = t2.data
  let t3 = await imageNameListApi()
  initData.imageOptions = t3.data
}

getData()

</script>

<style lang="scss">
.gvb_article_data {
  span {
    margin-right: 7px;

    i {
      margin-right: 3px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.gvb_article_abstract {
  max-width: 12rem;
  overflow-x: hidden;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.gvb_article_tags {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  justify-items: self-start;
}

.gvb_article_title {
  em {
    color: red;
    margin-right: 1px;
  }
}
</style>