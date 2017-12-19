<template>
  <div class="h-100 w-100" style="" id="Province" />
</template>
<script>
import echarts from 'echarts'
import { getMax } from '@/util'
import { getProvince } from '@/api'
export default {
  name: 'Province',
  data: () => ({
    dataAxis: [],
    chartData: [],
    percentage: [],
  }),

  computed: {
    shadowMax() {
      return getMax(this.chartData) * 1.5
    },
    chartShadow() {
      return new Array(this.chartData.length).fill(this.shadowMax)
    },
  },

  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('Province'))
      this.config()
    },

    config() {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: `
          {b}:<br/>
          {a2}: {c2}<br/>
          {a1}: {c1}%`,
        },
        grid: {
          left: '3%',
          right: '1%',
          bottom: '3%',
          containLabel: true,
        },
        yAxis: {
          // name: '单位（元）',
          data: this.dataAxis,
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#5486c9',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#5486c9',
            },
          },
        },
        xAxis: {
          show: false,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              show: false,
              color: '#87a8d7',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#112c4c',
            },
          },
        },

        series: [
          {
            // For shadow
            name: '横轴',
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(100,100,100,0.1)' },
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: this.chartShadow,
          },
          {
            // For percentage
            name: '百分比',
            type: 'bar',
            itemStyle: {
              normal: {
                opacity: 50,
              },
            },
            data: this.percentage,
            label: {
              normal: {
                show: true,
                position: 'left',
                color: 'white',
                distance: -180,
                color: '#5486c9',
                formatter: '{c}%',
              },
            },
          },
          {
            name: '预售量',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ff7800',
                barBorderRadius: 2,
                shadowBlur: 10,
                shadowColor: '#111',
              },
            },
            data: this.chartData,
            label: {
              normal: {
                show: true,
                position: 'left',
                color: 'white',
                distance: -130,
              },
            },
          },
        ],
      })
    },

    update() {
      getProvince().then(res => {
        this.dataAxis = res.map(i => i.province).reverse()
        this.chartData = res.map(i => i.sum).reverse()
        this.percentage = res.map(i => i.percentage).reverse()
        this.config()
      })
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
#ProvinceChart canvas{
  /* top: -40px !important; */
  height:200px !important;
}
</style>





<!-- var zoomSize = 6;
myChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
}); -->
