<template>
  <div class="w-100 h-100" :id="id"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    id: {
      type: String,
      default: 'chart',
    },
  },
  data() {
    return {
      chart: null,
      chartData: [],
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
      this.chart = echarts.init(document.getElementById(this.id))
      this.config()
    },

    config() {
      this.chart.setOption({
        ,
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
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true,
        // },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B',
              },
            },
            data: this.xAxisLabels,
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位（万元）',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#57617B',
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
                color: 'rgba(255, 120, 0, 0.2)',
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: 'rgb(255, 120, 0)',
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
      const random = Math.round(Math.random() * 100 + 5)
      this.chartData = [...this.chartData, random]
      this.config()
    },

    refresh() {
      this.chartData = []
    },
  },

  mounted() {
    this.initChart()
    let count = 25
    const int = setInterval(() => {
      if (count-- > 0) {
        this.update()
      } else {
        this.refresh()
        count = 25
      }
    }, 1000)
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
