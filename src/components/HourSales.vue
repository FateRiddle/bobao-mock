<template>
  <div class="pl3 w-100 h-100" id="HourSales"></div>
</template>

<script>
import echarts from 'echarts'
import { getHourSales } from '@/api'
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
      chartData: [0],
    }
  },

  computed: {
    xAxisLabels() {
      return new Array(25).fill(0).map((x, i) => {
        if (i < 10) {
          return '0' + i
        } else if (i === 24) {
          return '24h'
        } else {
          return i
        }
      })
    },
  },

  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('HourSales'))
      this.config()
    },

    config() {
      this.chart.setOption({
        // ,
        // title: {
        //   text: '请求数',
        //   textStyle: {
        //     fontWeight: 'normal',
        //     fontSize: 16,
        //     color: '#F1F1F3',
        //   },
        //   left: '6%',
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
          // formatter: `
          // {b}时<br/>
          // {a0}: {c0}<br/>`,
        },
        // legend: {
        //   icon: 'rect',
        //   itemWidth: 14,
        //   itemHeight: 5,
        //   itemGap: 13,
        //   data: ['移动', '电信', '联通'],
        //   right: '4%',
        //   textStyle: {
        //     fontSize: 12,
        //     color: '#F1F1F3',
        //   },
        // },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '7%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                // color: '#57617B',
                color: '#87a8d7',
              },
            },
            data: this.xAxisLabels,
          },
        ],
        yAxis: [
          {
            type: 'value',
            // name: '单位(万元) 总销售量流线图',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#87a8d7',
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
              },
            },
            splitLine: {
              lineStyle: {
                color: '#112c4c',
              },
            },
          },
        ],

        series: [
          {
            name: '预售量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: 'rgba(255, 120, 0, 0.3)',
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: '#ff7800',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12,
              },
            },
            data: this.chartData,
          },
        ],
      })
    },

    update() {
      getHourSales().then(res => {
        // console.log('hour', res)
        this.chartData = [0, ...res.map(i => i.sum / 10000)]
        this.config()
      })
      // const random = Math.round(Math.random() * 100 + 5)
      // this.chartData = [...this.chartData, random]
    },

    refresh() {
      this.chartData = []
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
<style scoped>
 /* #HourSales{background: rgba(255,255,255,.2) !important} */
</style>
