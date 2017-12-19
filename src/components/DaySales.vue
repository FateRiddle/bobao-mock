<template>
  <div class="pl3 w-100 h-100" id="DaySales"></div>
</template>

<script>
import echarts from 'echarts'
import { getDaySales } from '@/api'
import { format } from '@/util'
export default {
  // props: {
  //   id: {
  //     type: String,
  //     default: 'chart',
  //   },
  // },
  data() {
    return {
      chart: null,
      chartData: [],
      targetData: [],
      percentage: [],
      xAxisData: new Array(22).fill(0).map((i, index) => {
        if (index < 12) {
          return index + 20
        } else if (index == 21) {
          return 10
        } else {
          return '0' + (index - 11)
        }
      }),
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('DaySales'))
      this.config()
    },

    config() {
      this.chart.setOption({
        // backgroundColor: '#08263a',
        tooltip: {
          trigger: 'axis',
          formatter: `
          {b}日<br/>
          {a0}: {c0}<br/>
          {a1}: {c1}<br/>
          {a2}: {c2}%`,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#87a8d7',
            },
          },
          show: true,
          data: this.xAxisData,
          axisLabel: {
            textStyle: {
              color: '#87a8d7',
            },
          },
        },
        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: 40,
        //   dimension: 0,
        //   inRange: {
        //     // color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'],
        //     color: ['rgba(255, 120, 0,0.6)', 'rgba(255, 120, 0, 0.6)'],
        //   },
        // },
        yAxis: {
          axisLine: {
            show: false,
            lineStyle: {
              color: '#87a8d7',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#87a8d7',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#112c4c',
            },
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            type: 'bar',
            data: this.targetData,
            name: '目标量',
            barGap: '-100%',
            itemStyle: {
              normal: {
                // color: '#308e92',
                color: '#00a6e0',
                // color: '#1a74d1',
                barBorderRadius: 5,
                shadowBlur: 10,
                shadowColor: '#111',
              },
            },
            animationEasing: 'elasticOut',
            animationEasingUpdate: 'ease',
          },
          {
            type: 'bar',
            data: this.chartData,
            name: '预售量',
            itemStyle: {
              normal: {
                color: '#ff7800',
                barBorderRadius: 5,
                shadowBlur: 10,
                shadowColor: '#111',
              },
            },
            animationEasing: 'elasticOut',
            animationEasingUpdate: 'ease',
            // animationDelay(idx) {
            //   return idx * 50
            // },
            // animationDelayUpdate(idx) {
            //   return idx * 20
            // },
          },
          {
            type: 'bar',
            data: this.percentage,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
              },
            },
            name: '百分比',
          },
        ],
      })
    },

    update() {
      getDaySales().then(res => {
        // console.log('day', res)
        this.chartData = res.slice(0, 22).map(i => i.sum / 10000)
        this.targetData = res.slice(0, 22).map(i => i.targetSum / 10000)
        this.percentage = res
          .slice(0, 22)
          .map(i => (i.sum / i.targetSum * 100).toFixed(1))
        // this.xAxisData = res.map(i => format(i.date))
        this.config()
      })
      // this.chartData = new Array(30).fill(0).map(i => {
      //   return Math.round(Math.random() * 100 + 5)
      // })
    },
  },

  mounted() {
    this.initChart()
    this.update()
    setInterval(this.update, 100000)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
}
</script>
