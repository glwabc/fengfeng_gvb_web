<template>
  <div class="base_view index_view">
    <GVBNav></GVBNav>
    <GVBBanner></GVBBanner>
    <div class="gvb_base_container">
      <div class="gvb_inner_container">
        <div class="news_main">
          <div class="news_content">
            <div class="left">
              <ul>
                <li :class="{active: item.name === data.news_active}" v-for="item in data.news_init"
                    :key="item.id"
                    @click="get_new_data(item.id, item.name, item.url, false, 0)"><img
                    :src="item.url" alt="">{{ item.name }}
                </li>
              </ul>
            </div>
            <div class="right">
              <div class="title">
                <img :src="data.news_active_url" alt="">
                <h2 class="news_title">{{ data.news_active }} · 热搜榜</h2>
              </div>
              <div class="body">
                <ul>
                  <li v-for="item in data.news_list" :key="item.index">
                    <span class="index">{{ item.index }}</span> <a
                      :href="item.link"
                      target="_blank">{{ item.title }}</a>
                    <span class="num">{{ item.hotValue }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="thank"><a href="https://go.itab.link/">灵感与API来源于itab</a></div>

        </div>
      </div>
    </div>
    <GVBFooter></GVBFooter>
  </div>
</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
import GVBBanner from "@/components/gvb_banner.vue"
import GVBFooter from "@/components/gvb_footer.vue"
import {reactive} from "vue";
import {venDor} from "@/utils/vendor";
import {getNewsApi} from "@/api/news_api";

const data = reactive({
  news_list: [{
    index: '1',
    title: '兰亭序',
    hotValue: '综艺 3641701',
    link: 'https://s.weibo.com/weibo?q=%E5%85%B0%E4%BA%AD%E5%BA%8F'
  }],  // 新闻列表
  news_init: [
    {
      name: '微博',
      id: 'KqndgxeLl9',
      url: '/static/news/weibo.png'
    },
    {
      name: '知乎',
      id: 'mproPpoq6O',
      url: '/static/news/zhihu.png'
    },
    {
      name: '微信',
      id: 'WnBe01o371',
      url: '/static/news/weixin.png'
    },
    {
      name: '百度',
      id: 'Jb0vmloB1G',
      url: '/static/news/baidu.png'
    },
    {
      name: '36氪',
      id: 'Q1Vd5Ko85R',
      url: '/static/news/36ker.png'
    },
    {
      name: '哔哩哔哩',
      id: '74KvxwokxM',
      url: '/static/news/bilibili.png'
    },
    {
      name: '抖音',
      id: 'DpQvNABoNE',
      url: '/static/news/douyin.png'
    },
    {
      name: '拼多多',
      id: 'ARe1QZ2e7n',
      url: '/static/news/pingduoduo.png'
    }
  ],
  news_active: '微博',
  news_active_url: '/static/news/weibo.png',

})

async function get_new_data(id, name, url) {
  data.news_active = name
  data.news_active_url = url
  let e = new Date;
  e.toUTCString();
  const t = e.getTime().toString();
  let signaturekey = venDor.AES.encrypt(t, "itab1314").toString()
  const header = {
    version: "4.2.23",
    signaturekey: signaturekey,
  }
  let res = await getNewsApi(id, 50, header)
  data.news_list = res.data

}

get_new_data("KqndgxeLl9", "微博", "/static/news/weibo.png")

</script>

<style lang="scss">


.base_view {
  background-color: var(--bg);

  .gvb_base_container {
    display: flex;
    justify-content: center;


    .gvb_inner_container {
      width: 1200px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}

.news_main {
  width: 100%;

  .news_content {
    display: flex;
    min-height: 800px;
    background-color: var(--card_bg);
    border-radius: 5px;

    .left {
      width: 20%;
      border-right: 1px solid var(--bg_darken);

      ul {
        margin-top: 20px;

        img {
          height: 25px;
          border-radius: 5px;
          margin-right: 10px;
        }

        li {
          color: var(--text);
          height: 40px;
          display: flex;
          align-items: center;
          padding-left: 30%;
          transition: all 0.1s;
        }

        li.active {
          background-color: var(--active);
          color: white;
        }

        li:not(li.active) {
          // 选中非active的
          cursor: pointer;

          &:hover {
            color: #3a8ee6;
          }

        }
      }
    }

    .right {
      width: 80%;
      padding: 20px;

      .title {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--bg_darken);

        img {
          width: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }

        h2 {
          font-size: 20px;
        }
      }

      .body {
        margin-top: 10px;

        ul {
          list-style: none;

          li {
            display: flex;
            font-size: 14px;
            margin-bottom: 10px;
            align-items: start;

            &:nth-child(1) {
              .index {
                background-color: #fe2d46;
                color: white;
              }
            }

            &:nth-child(2) {
              .index {
                background-color: #ff6600;
                color: white;
              }
            }

            &:nth-child(3) {
              .index {
                background-color: #faa90e;
                color: white;
              }
            }

            .index {
              width: 20px;
              height: 20px;
              border-radius: 5px;
              color: var(--text);
              background-color: var(--bg_darken);
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 20px;
            }

            a {
              width: 77%;
              color: var(--text);
              transition: all 0.2s;

              &:hover {
                color: #3a8ee6;
              }
            }

            .num {
              width: 20%;
              display: flex;
              justify-content: right;
            }
          }
        }
      }
    }
  }

  .thank {
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: center;

    a {
      font-size: 14px;
      color: var(--font_1);
    }
  }
}

</style>