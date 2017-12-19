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
      xAxisData: new Array(30).fill(0).map((i, index) => index + '号'),
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.showLoading()
      setTimeout(_ => {
        this.chart.hideLoading()
        this.config()
      }, 50)
    },

    config() {
      this.chart.setOption({
        // backgroundColor: '#08263a',
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          show: true,
          data: this.xAxisData,
          axisLabel: {
            textStyle: {
              color: '#4a657a',
            },
          },
        },
        visualMap: {
          show: false,
          min: 0,
          max: 50,
          dimension: 0,
          inRange: {
            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'],
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#4a657a',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#112c4c',
            },
          },
          axisTick: {},
        },
        series: [
          {
            type: 'bar',
            data: this.chartData,
            name: '预售量',
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                shadowBlur: 10,
                shadowColor: '#111',
              },
            },
            animationEasing: 'elasticOut',
            animationEasingUpdate: 'ease',
            animationDelay(idx) {
              return idx * 50
            },
            animationDelayUpdate(idx) {
              return idx * 20
            },
          },
        ],
      })
    },

    update() {
      this.chartData = new Array(30).fill(0).map(i => {
        return Math.round(Math.random() * 100 + 5)
      })
      this.config()
    },
  },

  mounted() {
    this.initChart()
    setInterval(this.update, 2000)
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
