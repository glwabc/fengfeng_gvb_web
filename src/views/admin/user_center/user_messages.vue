<template>
  <div>
    <GVBTable :columns="data.columns"
              base-url="/api/messages"
              like-title="搜索文章标题"
              ref="gvbTable"
              :is-add="false"
              :is-delete="false"
              :is-select="false"
              default-delete>
      <template #cell="{column, record}">
        <template v-if="column.key === 'send_user'">
          <img :src="record.send_user_avatar" height="40" style="border-radius: 50%" alt="">
          <span style="margin-left: 10px">{{ record.send_user_nick_name }}</span>
        </template>
        <template v-if="column.key === 'rev_user'">
          <img :src="record.rev_user_avatar" height="40" style="border-radius: 50%" alt="">
          <span style="margin-left: 10px">{{ record.rev_user_nick_name }}</span>
        </template>
      </template>
      <template #edit="{record}">
        <a-button type="primary" @click="applyModal(record)">回复</a-button>
      </template>


    </GVBTable>
  </div>
</template>

<script setup>
import GVBTable from "@/components/admin/gvb_table.vue"
import {reactive} from "vue";

const data = reactive({
  list: [
    {
      "send_user_id": 1,
      "send_user_nick_name": "admin1",
      "send_user_avatar": "/uploads/avatar/default.png",
      "rev_user_id": 2,
      "rev_user_nick_name": "zhangsan",
      "rev_user_avatar": "/uploads/avatar/default.png",
      "content": "吃饭了么",
      "created_at": "2023-03-11T09:03:59.871+08:00",
      "message_count": 2
    }
  ],
  columns: [
    {title: '发送人', dataIndex: 'send_user', key: 'send_user'},
    // {title: '发送人', dataIndex: 'send_user_nick_name', key: 'send_user_nick_name'},
    // {title: '发送人头像', dataIndex: 'send_user_avatar', key: 'send_user_avatar'},
    {title: '接收人', dataIndex: 'rev_user', key: 'rev_user'},
    // {title: '接收人', dataIndex: 'rev_user_nick_name', key: 'rev_user_nick_name'},
    // {title: '接收人头像', dataIndex: 'rev_user_avatar', key: 'rev_user_avatar'},
    {title: '消息内容', dataIndex: 'content', key: 'content'},
    {title: '消息总数', dataIndex: 'message_count', key: 'message_count'},
    {title: '最新时间', dataIndex: 'created_at', key: 'created_at'},
    {title: "操作", dataIndex: "action", key: "action"}
  ],
})

function applyModal(record) {
  console.log(record)
}

</script>

<style scoped>

</style>