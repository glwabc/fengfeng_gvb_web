<template>
  <GVBCCard title="今日热搜" class="news_card" link_name="查看更多" link="/news">
    <span class="index">1</span>
    <a href="https://s.weibo.com/weibo?q=%E4%B8%AD%E4%BF%84%E5%85%83%E9%A6%96%E5%BC%BA%E8%B0%83%E9%80%9A%E8%BF%87%E5%92%8C%E8%B0%88%E8%A7%A3%E5%86%B3%E4%B9%8C%E5%85%8B%E5%85%B0%E5%8D%B1%E6%9C%BA"
       target="_blank">中俄元首强调通过和谈解决乌克兰危机</a>
    <span class="num">68.7万</span>
  </GVBCCard>
</template>

<script setup>
import GVBCCard from "@/components/gvb_card.vue"



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
      width: 85%;
    }

    .num {
      width: 10%;
      text-align: right;
    }

  }


}
</style>