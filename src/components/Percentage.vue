<template>
  <div class="bt bw2 h-100 w-100" style="border-color:#fd7801">
    <div class="h-100 w-100 bb bl br" style="border-color:#112c4c" id="Percentage"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getPercentage } from '@/api'
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
      dataNow: [],
      dataThen: [],
      xAxisLabels: new Array(22).fill(0).map((i, index) => {
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

  computed: {
    // xAxisLabels() {
    //   return new Array(25).fill(0).map((x, i) => {
    //     if (i < 10) {
    //       return '0' + i
    //     } else if (i === 24) {
    //       return '24h'
    //     } else {
    //       return i
    //     }
    //   })
    // },
  },

  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('Percentage'))
      this.config()
    },

    config() {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
        },

        grid: {
          left: '2%',
          right: '6%',
          bottom: '5%',
          containLabel: true,
        },

        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['2017年日预售额', '2016年日预售额'],
          top: '2%',
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3',
          },
        },

        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#87a8d7',
              },
            },
            data: this.xAxisLabels,
          },
        ],

        yAxis: [
          {
            type: 'value',
            name: '单位 (万元)',
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
              textStyle: {
                // fontSize: 14,
              },
            },
            splitLine: {
              lineStyle: {
                color: '#112c4c',
              },
            },
          },
        ],

        dataZoom: [
          {
            type: 'inside',
          },
        ],

        series: [
          {
            name: '2017年日预售额',
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
            // areaStyle: {
            //   normal: {
            //     color: 'rgba(255, 120, 0, 0.2)',
            //     shadowColor: 'rgba(0, 0, 0, 0.1)',
            //     shadowBlur: 10,
            //   },
            // },
            itemStyle: {
              normal: {
                color: 'red',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12,
              },
            },
            data: this.dataNow,
          },
          {
            name: '2016年日预售额',
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
            itemStyle: {
              normal: {
                color: 'green',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12,
              },
            },
            data: this.dataThen,
          },
        ],
      })
    },

    update() {
      getPercentage().then(res => {
        // console.log('percent', res)
        this.dataNow = res.map(i => i.percentage1 / 10000)
        this.dataThen = res.map(i => i.percentage2 / 10000)
        this.config()
      })
      // const randomNow = Math.round(Math.random() * 100 + 5)
      // const randomThen = Math.round(Math.random() * 190 + 5)
      // this.dataNow = [...this.dataNow, randomNow]
      // this.dataThen = [...this.dataThen, randomThen]
    },

    refresh() {
      this.dataNow = []
      this.dataThen = []
    },
  },

  mounted() {
    this.initChart()
    this.update()
    setInterval(() => {
      this.update()
    }, 100000)
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
<style>
#Percentage{background: #0b1a33 !important;}
</style>
