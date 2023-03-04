<template>
  <div class="gvb_container">

    <a-modal v-model:visible="data.modalVisible" title="添加用户" @ok="handleOk">
      <a-form
          :model="formState"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
      >
        <a-form-item label="用户名" name="user_name" has-feedback
                     :rules="[{ required: true, message: '请输入用户名' ,trigger: 'blur'}]">
          <a-input v-model:value="formState.user_name" placeholder="用户名"/>
        </a-form-item>

        <a-form-item label="昵称" name="nick_name" has-feedback
                     :rules="[{ required: true, message: '请输入昵称',trigger: 'blur' }]">
          <a-input v-model:value="formState.nick_name" placeholder="昵称"/>
        </a-form-item>

        <a-form-item label="密码" name="password" has-feedback
                     :rules="[{ required: true, message: '请输入密码',trigger: 'blur' }]">
          <a-input-password v-model:value="formState.password" placeholder="密码"/>
        </a-form-item>

        <a-form-item label="确认密码" name="re_password" has-feedback
                     :rules="[{ required: true, message: '请输入确认密码' }, {validator: validateRePassword, message: '两次密码不一致', trigger: 'blur'}]">
          <a-input-password v-model:value="formState.re_password" placeholder="确认密码"/>
        </a-form-item>

        <a-form-item label="权限" name="role" :rules="[{ required: true, message: '请选择用户权限' ,trigger: 'blur'}]">
          <a-select
              v-model:value="formState.role"
              style="width: 200px"
              :options="roleOptions"
              placeholder="选择权限"
          ></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:visible="data.modalUpdateVisible" title="编辑用户" @ok="update">
      <a-form
          :model="formUpdateState"
          name="basic"
          ref="formRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
      >
        <a-form-item label="昵称" name="nick_name" has-feedback
                     :rules="[{ required: true, message: '请输入昵称',trigger: 'blur' }]">
          <a-input v-model:value="formUpdateState.nick_name" placeholder="昵称"/>
        </a-form-item>
        <a-form-item label="权限" name="role" :rules="[{ required: true, message: '请选择用户权限' ,trigger: 'blur'}]">
          <a-select
              v-model:value="formUpdateState.role"
              style="width: 200px"
              :options="roleOptions"
              placeholder="选择权限"
          ></a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <div class="gvb_search">
      <a-input-search
          placeholder="搜索用户昵称"
          style="width: 200px"
      />
    </div>
    <div class="gvb_actions">
      <a-button type="primary" @click="addModal">添加</a-button>
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
            <a-button class="gvb_table_action update" @click="updateModal(record)" type="primary">编辑</a-button>
            <a-popconfirm
                title="是否确定删除?"
                ok-text="删除"
                cancel-text="取消"
                @confirm="userRemove(record.id)"
            >
              <a-button class="gvb_table_action delete" type="danger">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
    <div class="gvb_pages">
      <a-pagination
          :showSizeChanger="false"
          v-model:current="page.page"
          v-model:page-size="page.limit"
          @change="pageChange"
          :total="data.count"
          :show-total="total => `共 ${total} 条`"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {getFormatDate} from "@/utils/date";
import {userListApi, userCreateApi, userRemoveBatchApi, updateUserNickNameApi} from "@/api/user_api";
import {message} from "ant-design-vue";

const page = reactive({
  page: 1,
  limit: 5
})
const formRef = ref(null)

const roleOptions = [
  {
    value: 1,
    label: "管理员"
  },
  {
    value: 2,
    label: "用户"
  },
  {
    value: 3,
    label: "游客"
  }
]

let validateRePassword = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!");
  } else {
    return Promise.resolve();
  }
};

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
  count: 0,
  modalVisible: false,
  modalUpdateVisible: false,
})

const _formState = {
  user_name: "",
  nick_name: "",
  password: "",
  re_password: "",
  role: 2,
}

const formState = reactive({
  user_name: "",
  nick_name: "",
  password: "",
  re_password: "",
  role: 2,
})
const formUpdateState = reactive({
  nick_name: "",
  role: undefined,
  user_id: 0
})

function addModal() {
  data.modalVisible = true
}

// 选择复选框
function onSelectChange(selectedKeys) {
  data.selectedRowKeys = selectedKeys
}

async function removeBatch() {
  let res = await userRemoveBatchApi(data.selectedRowKeys)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  getData()
}

async function getData() {
  let res = await userListApi(page)
  data.list = res.data.list
  data.count = res.data.count
}

async function handleOk() {
  try {
    await formRef.value.validate()
    // 发登录请求
    let res = await userCreateApi(formState)
    if (res.code) {
      message.error(res.msg)
      return
    }
    message.success(res.msg)
    data.modalVisible = false
    Object.assign(formState, _formState)
    formRef.value.clearValidate()

    getData()
  } catch (e) {
  }

}

function pageChange(_page, limit) {
  getData()
}

async function userRemove(user_id) {
  let res = await userRemoveBatchApi([user_id])
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  getData()
}


function updateModal(record) {
  data.modalUpdateVisible = true
  formUpdateState.user_id = record.id
  formUpdateState.nick_name = record.nick_name
  formUpdateState.role = record.role_id
}

async function update() {
  data.modalUpdateVisible = false
  let res = await updateUserNickNameApi(formUpdateState)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  getData()
}

getData()

</script>

<style lang="scss">
.gvb_container {
  background-color: var(--card_bg);

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