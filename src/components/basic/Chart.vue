<template>
  <div class="h-100 w-100" style="" id="Province" />
</template>
<script>
import echarts from 'echarts'
import { getProvince } from '@/api'
export default {
  name: 'Province',
  data: () => ({
    dataAxis: [],
    chartData: [],
  }),

  computed: {
    chartShadow() {
      return new Array(this.chartData.length).fill(1500)
    },
  },

  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('Province'))
      this.config()
    },

    config() {
      this.chart.setOption({
        yAxis: {
          // name: '单位（元）',
          data: this.dataAxis,
          axisLabel: {
            textStyle: {
              color: '#57617B',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#57617B',
            },
          },
        },
        xAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999',
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
            name: '预售量',
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(100,100,100,0.1)' },
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: this.chartShadow,
          },
          {
            name: '预售量',
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'rgb(255, 120, 0)',
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
                distance: -100,
              },
            },
          },
        ],
      })
    },

    update() {
      // const random = () => Math.round(Math.random() * 200 + 5)
      getProvince().then(res => {
        this.dataAxis = res.map(i => i.province)
        this.chartData = res.map(i => i.sum)
      })
      this.config()
    },
  },

  mounted() {
    this.initChart()
    setInterval(this.update, 1000)
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
