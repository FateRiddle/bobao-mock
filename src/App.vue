<template>
  <div id="app" class='vh-100 overflow-y-hidden-ns'>
    <img src="/static/bg-zuo.png" class="absolute w-40" style="" alt="">
    <img src="/static/bg-you.png" class="absolute right-0 w-50" alt="">
    <main class='main flex flex-column vh-100' style="">
      <div class="flex-none w-100 mb3 mt4">
        <MyTitle />
      </div>
      <section class="flex flex-wrap justify-center content-between"
        style="height: calc(100vh - 14rem)"
      >
        <div class="w-20-ns w-100 graph1 z-1" style="border-color: #132b4d">
          <Brand />
        </div>
        <div class="relative w-50-ns w-100 graph1 chart" >
          <div style="color:#87a8d7" class="absolute f7 pt3 pl4">
            单位（万元）预售销售汇总
          </div>
          <DaySales />
        </div>
        <div class="graph1 chart w-20-ns w-100 mt3 mt0-ns z-1" >
          <Percentage />
        </div>
        <div class="graph2 w-20-ns w-100 mt3 mt0-ns graph2 chart" >
          <City />
        </div>
        <div class="relative w-50-ns w-100 graph2 chart" >
          <div style="color:#87a8d7" class="absolute f7 pt3 pl4">
            单位（万元）总销售量流线图
          </div>
          <HourSales />
        </div>
        <div class="graph2 chart relative w-20-ns w-100 legend mt3 mt0-ns">
          <header class="absolute pv2 mb2 w-100" style="border-bottom:solid 2px #122c4d;">
            <span class=" db bl bw2 b--orange white pl2 lh-copy tracked">省份TOP10</span>
          </header>
          <div class="h-100 relative">
            <!-- <section class="absolute right-0 h-100">
              haha
            </section> -->
            <Province />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import HourSales from "./components/HourSales"
import DaySales from "./components/DaySales"
import MyTitle from "./components/Title"
import Brand from "./components/Brand"
import City from "./components/City"
import Percentage from "./components/Percentage"
import Province from "./components/Province"
import { getProvince } from "@/api"

export default {
  name: "app",
  data: () => ({
    province: {
      dataAxis: [],
      chartData: [],
      percentage: [],
    },
  }),
  mounted() {
    //do something after mounting vue instance
    getProvince().then(res => {
      this.province = {
        dataAxis: res.map(i => i.province),
        chartData: res.map(i => i.sum),
        percentage: res.map(i => i.percentage),
      }
    })
  },
  components: {
    MyTitle,
    Brand,
    HourSales,
    DaySales,
    City,
    Percentage,
    Province,
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.graph1,
.graph2 {
  height: 100%;
}

.chart {
  height: 70%;
}

@media screen and (min-width: 30em) {
  .graph1 {
    height: 41%;
  }

  .graph2 {
    height: 57%;
  }
}

/* @media screen and (min-width: 70em) {
  .main {
    padding-top: 8.5%;
  }
} */
</style>
