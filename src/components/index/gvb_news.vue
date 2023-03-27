<template>
  <GVBCCard title="今日热搜" class="news_card" link_name="查看更多" link="/news">
    <span class="index">1</span>
    <a :href="data.link" target="_blank">{{ data.title }}</a>
    <span class="num">{{  data.hotValue }}</span>
  </GVBCCard>
</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"
import {venDor} from "@/utils/vendor";
import {getNewsApi} from "@/api/news_api";
import {reactive} from "vue";

async function getData() {
  let e = new Date;
  e.toUTCString();
  const t = e.getTime().toString();
  let signaturekey = venDor.AES.encrypt(t, "itab1314").toString()
  const header = {
    version: "4.2.23",  // 版本随便写
    signaturekey: "",
  }
  let res = await getNewsApi("KqndgxeLl9", 1, header)
  if (res.code || res.data.length === 0){
    return
  }
  Object.assign(data, res.data[0])

}

const data = reactive({
  index: '1',
  title: '兰亭序',
  hotValue: '综艺 3641701',
  link: 'https://s.weibo.com/weibo?q=%E5%85%B0%E4%BA%AD%E5%BA%8F'
})
getData()

</script>

<style lang="scss">
.news_card {
  .body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .index {
      width: 5%;
    }

    a {
      width: 75%;
    }

    .num {
      width: 20%;
      text-align: right;
    }

  }


}
</style>