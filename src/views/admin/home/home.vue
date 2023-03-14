<template>
  <div>
    <div class="gvb_data_preview">
      <div class="preview_item" v-for="(item,index) in data.sum_data_list" :key="index">
        <div class="icon">
          <i :class="'iconfont '+ iconList[index]"></i>
        </div>
        <div class="text">
          <div class="data_title">{{ item.label }}</div>
          <div class="data_sum">{{ item.value }}</div>
        </div>
      </div>
    </div>
    <div class="gvb_data_charts">
      <div class="left">
        <div class="article_calendar">
          <div class="title">
            文章日历
          </div>
          <div id="article_calendar" style="height: 400px">

          </div>
        </div>
      </div>
      <div class="right">

      </div>
    </div>

  </div>
</template>

<script setup>
import * as echarts from "echarts";
import {reactive, onMounted} from "vue";
import {getArticleCalendarApi} from "@/api/article_api";

async function articleCalendar() {
  let color = "#000000"
  let inRangeColor = [
    "#ebedf0", "#c6e48b", "#7bc96f", "#32af4a",
    "#1a792c", "#0f5e1e", "#0f491a", "#02340c"
  ]
  let borderColor = "#fff"

  // if (vue.theme === "dark") {
  //   color = "#5a5a5a"
  //   inRangeColor = [
  //     "#404148", "#c6e48b", "#7bc96f", "#32af4a",
  //     "#1a792c", "#0f5e1e", "#0f491a", "#02340c"
  //   ]
  //   borderColor = "#222429"
  // }

  let chart = document.getElementById("article_calendar")
  if (!chart) {
    return
  }
  let res = await getArticleCalendarApi()
  let article_data = []
  let article_change = []
  let len = res.data.length
  article_change.push(res.data[0].date)
  article_change.push(res.data[len -1].date)

  for (const item of res.data) {
    article_data.push(item.count)
  }

  console.log(chart, article_data, article_change)


  // let article_change = res['data']['article_date_range']
  // let article_data = res['data']['article_date_list']
  let myChart = echarts.init(chart), option = {
    tooltip: {
      padding: 10,
      backgroundColor: "#555",
      borderColor: "#777",
      borderWidth: 1,
      formatter: function (e) {
        e = e.value;
        return '<div style="font-size: 14px;">' + e[0] + "：" + e[1] + "</div>"
      }
    },
    visualMap: {
      show: !0,
      showLabel: !0,
      categories: [0, 1, 2, 3, 4, 5, 6, 7],
      calculable: !0,
      inRange: {
        symbol: "rect",
        color: inRangeColor
      },  // 对应上面的四个值
      itemWidth: 12,
      itemHeight: 12,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      textStyle: {
        color: color
      }
    },
    calendar: [{
      top: 25,
      left: "center",
      range: article_change,  // 时间范围
      cellSize: [13, 13],
      splitLine: {show: !1},
      itemStyle: {color: "#196127", borderColor: borderColor, borderWidth: 2},
      yearLabel: {show: !1},
      monthLabel: {
        nameMap: "cn",
        fontSize: 11,
        color: color
      },
      dayLabel: {
        formatter: "{start}  1st",
        nameMap: "cn",
        fontSize: 11,
        color: color
      }
    }],
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 0,
        data: article_data,
      }
    ],
  };
  myChart.setOption(option)

  window.onresize = () => {
    myChart.resize();
  }
}

onMounted(() => {
  articleCalendar()
})

const iconList = [
  "icon-yonghutongji",
  "icon-wenzhang",
  "icon-shuyi_qunliao",
  "icon-sinandengluyonghu",
  "icon-zhuce"
]

const data = reactive({
  sum_data_list: [
    {
      label: "用户总数",
      value: 42,
    },
    {
      label: "文章总数",
      value: 123,
    },
    {
      label: "消息总数",
      value: 1234,
    },
    {
      label: "今日登录",
      value: 1,
    },
    {
      label: "今日注册",
      value: 2,
    }
  ]
})

</script>

<style lang="scss">
.gvb_data_preview {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 20px;
}

.preview_item {
  display: flex;
  background-color: var(--card_bg);
  border-radius: 5px;
  border: 1px solid var(--card_boder);
  padding: 20px;


  .icon {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 40px;
      color: var(--active);
    }
  }

  .text {
    width: 40%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--text);

    .data_sum {
      font-size: 18px;
    }

    .data_title {
      font-weight: 600;
    }
  }
}

.gvb_data_charts {
  display: flex;
  margin-top: 20px;

  .left {
    width: 780px;
    margin-right: 20px;
  }

  .article_calendar {
    background-color: var(--card_bg);
    padding: 10px 20px;
    border: 1px solid var(--card_boder);
    border-radius: 5px;
  }

}
</style>