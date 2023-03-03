<template>
  <div class="gvb_container">
    <div class="gvb_search">
      <a-input-search
          placeholder="搜索用户昵称"
          style="width: 200px"
      />
    </div>
    <div class="gvb_actions">
      <a-button type="primary">添加</a-button>
      <a-button type="danger" @click="removeBatch" v-if="data.selectedRowKeys.length">批量删除</a-button>
    </div>
    <div class="gvb_tables">
      <a-table
          :columns="data.columns"
          :row-selection="{
            selectedRowKeys: data.selectedRowKeys,
            onChange: onSelectChange }"
          :pagination="false"
          row-key="id"
          :data-source="data.list">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <img class="gvb_table_avatar" :src="record.avatar" alt="">
          </template>
          <template v-if="column.key === 'created_at'">
            <span>{{ getFormatDate(record.created_at) }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <a-button class="gvb_table_action update" type="primary">编辑</a-button>
            <a-button class="gvb_table_action delete" type="danger">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>
    <div class="gvb_pages">
      <a-pagination
          :showSizeChanger="false"
          v-model:current="page.page"
          v-model:page-size="page.limit"
          :total="85"
          :show-total="total => `共 ${total} 条`"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {getFormatDate} from "@/utils/date";

const page = reactive({
  page: 1,
  limit: 10
})

console.log("user_list", import.meta.env)

const data = reactive({
  columns: [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '昵称', dataIndex: 'nick_name', key: 'nick_name'},
    {title: '头像', dataIndex: 'avatar', key: 'avatar'},
    {title: '邮箱', dataIndex: 'email', key: 'email'},
    {title: '角色', dataIndex: 'role', key: 'role'},
    {title: '注册来源', dataIndex: 'sign_status', key: 'sign_status'},
    {title: 'ip', dataIndex: 'ip', key: 'ip'},
    {title: '地址', dataIndex: 'addr', key: 'addr'},
    {title: '注册时间', dataIndex: 'created_at', key: 'created_at'},
    {title: '操作', dataIndex: 'action', key: 'action'},
  ],
  list: [
    {
      "id": 2,
      "created_at": "2023-02-26T18:16:38.074+08:00",
      "nick_name": "zhangsan",
      "user_name": "zhangsan",
      "avatar": "/uploads/avatar/default.png",
      "email": "z****@qq.com",
      "tel": "",
      "addr": "内网地址",
      "token": "",
      "ip": "127.0.0.1",
      "role": "用户",
      "sign_status": "邮箱"
    },
  ],
  selectedRowKeys: [],
})

// 选择复选框
function onSelectChange(selectedKeys) {
  data.selectedRowKeys = selectedKeys
}

function removeBatch() {
  console.log(data.selectedRowKeys)
}

</script>

<style lang="scss">
.gvb_container {
  background-color: white;

  .gvb_search {
    padding: 10px;
    border-bottom: 1px solid var(--bg);
  }

  .gvb_actions {
    padding: 10px;

    .ant-btn {
      margin-right: 10px;
    }
  }

  .gvb_tables {
    padding: 10px;
  }

  .gvb_pages {
    display: flex;
    justify-content: center;
    padding: 10px;
    margin-bottom: 20px;
  }

  .gvb_table_avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .gvb_table_action.update {
    margin-right: 10px;
  }
}
</style>