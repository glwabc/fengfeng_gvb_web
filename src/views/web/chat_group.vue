<template>
  <div class="base_view chat_group_view">
    <GVBNav is_show></GVBNav>
    <div class="gvb_base_container" :style="{height: data.allHeight}">
      <div class="gvb_inner_container">
        <div class="gvb_chat_head">
          <div class="title">【枫枫知道】在线聊天室</div>
          <div class="people_num">在线人数： 1</div>
        </div>
        <div class="gvb_chat_body" :style="{height: data.setHeight}">

          <div class="message" v-for="(item,index) in data.message_list" :key="index">
            <template v-if="item.msg_type === inRoomMsg">
              <div class="in_room_msg">
                <span>{{ item.content }}</span>
              </div>
            </template>
            <template v-if="item.msg_type === outRoomMsg">
              <div class="out_room_msg">
                <span>{{ item.content }}111</span>
              </div>
            </template>
            <template v-if="item.msg_type === textMsg">
              <div :class="{me:item.is_me}">
                <div class="avatar">
                  <img :src="item.avatar" alt=""></div>
                <div class="message-main">
                  <div class="message-user">{{ item.nick_name }}</div>
                  <div class="message-content">
                    <div class="content">
                      <div class="txt-message">{{ item.content }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>


          </div>

        </div>
        <div class="gvb_chat_menu">
          <span><i class="fa fa-cloud-upload"></i></span>
          <span><i class="fa fa-file-image-o"></i></span>
          <span><i class="fa fa-file-audio-o"></i></span>
        </div>
        <div class="gvb_chat_footer">
          <a-textarea placeholder="发送你的消息，聊起来吧" :auto-size="{ minRows: 4, maxRows: 4 }"></a-textarea>
          <a-button class="chat_btn">发送</a-button>
        </div>
      </div>
    </div>
    <!--    <GVBFooter></GVBFooter>-->
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
import GVBBanner from "@/components/gvb_banner.vue"
import GVBFooter from "@/components/gvb_footer.vue"
import {reactive} from "vue";
import {chatGroupApi} from "@/api/chat_group_api";

// allHeight - 60 - 20 -60 - 30 - 148  - 2 - 20
/*
InRoomMsg  ctype.MsgType = 1 // 进入聊天室
TextMsg    ctype.MsgType = 2 // 发文本消息
ImageMsg   ctype.MsgType = 3 // 图片消息
VoiceMsg   ctype.MsgType = 4 // 语音消息
VideoMsg   ctype.MsgType = 5 // 视频消息
SystemMsg  ctype.MsgType = 6 // 系统消息
OutRoomMsg ctype.MsgType = 7 // 退出聊天室
 */

const inRoomMsg = 1;
const textMsg = 2;
const systemMsg = 6;
const outRoomMsg = 7;


const data = reactive({
  allHeight: "100vh",
  setHeight: "597px",
  message_list: [
    {
      "avatar": "uploads/chat_avatar/大.png",
      "content": "大意的巴蒂斯图塔 进入聊天室",
      "created_at": "2023-02-26T10:47:16.948+08:00",
      "id": 14,
      "is_group": true,
      "msg_type": 1,
      "nick_name": "大意的巴蒂斯图塔"
    },
    {
      "avatar": "uploads/chat_avatar/矮.png",
      "content": "矮小的哈维 进入聊天室",
      "created_at": "2023-02-26T10:46:57.796+08:00",
      "id": 13,
      "is_group": true,
      "msg_type": 1,
      "nick_name": "矮小的哈维"
    },
    {
      "avatar": "uploads/chat_avatar/矮.png",
      "content": "矮小的哈维 进入聊天室",
      "created_at": "2023-02-26T10:46:56.725+08:00",
      "id": 12,
      "is_group": true,
      "msg_type": 1,
      "nick_name": "矮小的哈维"
    },
    {
      "avatar": "",
      "content": "专注的鲁尼 离开聊天室",
      "created_at": "2023-02-26T10:43:34.831+08:00",
      "id": 11,
      "is_group": true,
      "msg_type": 1,
      "nick_name": ""
    },
    {
      "avatar": "uploads/chat_avatar/专.png",
      "content": "专注的鲁尼 进入聊天室",
      "created_at": "2023-02-26T10:43:24.995+08:00",
      "id": 10,
      "is_group": true,
      "msg_type": 1,
      "nick_name": "专注的鲁尼"
    },
    {
      "avatar": "uploads/chat_avatar/约.png",
      "content": "你好啊",
      "created_at": "2023-02-26T10:43:12.555+08:00",
      "id": 9,
      "is_group": true,
      "msg_type": 2,
      "nick_name": "约翰·查尔斯求而不得"
    },
    {
      "avatar": "uploads/chat_avatar/鸣.png",
      "content": "好1123",
      "created_at": "2023-02-26T10:39:28.34+08:00",
      "id": 7,
      "is_group": true,
      "msg_type": 2,
      "nick_name": "鸣人完成了大四喜"
    },
    {
      "avatar": "uploads/chat_avatar/忧.png",
      "content": "好",
      "created_at": "2023-02-25T23:54:53.501+08:00",
      "id": 5,
      "is_group": true,
      "msg_type": 2,
      "nick_name": "忧郁的古利特"
    },
    {
      "avatar": "uploads/chat_avatar/大.png",
      "content": "你好啊",
      "created_at": "2023-02-25T23:54:48.381+08:00",
      "id": 4,
      "is_group": true,
      "msg_type": 2,
      "nick_name": "大气的加林查"
    },
  ]
})


async function getData() {
  // console.log(document.documentElement.offsetHeight)
  // console.log(document.documentElement.clientHeight)
  // console.log(document.documentElement.scrollHeight)
  let allHeight = document.documentElement.scrollHeight
  data.allHeigh = allHeight + "px"
  let setHeight = allHeight - 340
  data.setHeight = setHeight + "px"
  let res = await chatGroupApi()
  data.message_list = res.data.list


}

getData()

</script>

<style lang="scss">
.chat_group_view {
  .gvb_base_container {
    height: 100vh;

    .gvb_inner_container {
      margin-top: 80px;
    }
  }

  .gvb_chat_head {
    height: 60px;
    width: 100%;
    background-color: var(--card_bg);
    border-radius: 5px 5px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 16px;
    }

    .people_num {
      font-size: 12px;
    }
  }

  .gvb_chat_body {
    margin-top: 1px;
    height: 597px;
    background-color: var(--card_bg);
    overflow-y: auto;
    padding: 10px 20px;

    &::-webkit-scrollbar {
      width: 8px
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #e0dddd
    }

    &::-webkit-scrollbar-button {
      background-color: transparent
    }


    .message {
      margin-bottom: 20px;

      .in_room_msg, .out_room_msg {
        display: flex;
        justify-content: center;

        span {
          background-color: #e2e2e2;
          border-radius: 5px;
          color: #494949;
          font-size: 12px;
          padding: 2px 10px;
        }
      }

      > div {
        display: flex;

        .avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }

        .message-main {
          margin-left: 10px;

          .message-content {
            margin-top: 5px;

            .txt-message {
              background-color: #d2d2d2;
              padding: 10px;
              position: relative;
              width: fit-content;
              min-height: 41px;
              white-space: pre;
              border-radius: 5px;
            }

            .txt-message::before {
              content: "";
              display: block;
              position: absolute;
              left: -32px;
              top: 6px;
              border-width: 10px 20px;
              border-style: solid;
              border-color: transparent #d2d2d2 transparent transparent;
            }

          }
        }
      }

      > .me {
        justify-content: right;
        flex-direction: row-reverse;

        .message-main {
          .message-content {
            .txt-message::before {
              right: -31px;
              left: inherit;
              top: 6px;
              border-width: 10px 20px;
              border-style: solid;
              border-color: transparent transparent transparent #d2d2d2;
            }
          }
        }


      }
    }

  }

  .gvb_chat_menu {
    margin-top: 1px;
    height: 30px;
    background-color: var(--card_bg);
    display: flex;
    align-items: center;

    span {
      padding: 5px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  .gvb_chat_footer {
    position: relative;
    background-color: var(--card_bg);
    border-radius: 0 0 5px 5px;
    height: 148px;

    .ant-input {
      border: none;
      outline: none;

      &:focus {
        border: none;
        outline: none;
        box-shadow: none;
      }
    }

    .chat_btn {
      position: absolute;
      bottom: 10px;
      left: 10px;
    }
  }
}
</style>