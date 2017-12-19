<template>
  <div id="Brand" class="bt bw2 h-100 w-100 legend flex flex-column" style="border-color:#fd7801">
    <header class="white tc pv2 flex-none" style="color:#fd7801; background: #132b4d;">
      <img src="/static/zuo.png" alt="">
      预售品牌
      <img src="/static/you.png" alt="">
    </header>
    <section class="h-100 flex flex-wrap justify-between pt2 ph4 bl bb br"
      style="background: #0b1a33; border-color:#112c4c"
    >
      <div class="w-40 border-box flex flex-column" v-for="(b,index) in brands" :key="index" style="height:25%">
        <div style="background: #132b4d; border-color:#23426e" class="ba h-75">
          <img :src="b.src" :alt="b.brand" class="db center h-100">
        </div>
        <span class="pt1 db tr f6 tracked h-25" style="color:#87a8d7">{{b.sum}}</span>
      </div>
    </section>
  </div>
</template>
<script>
import { formatNum } from '@/util'
import { getBrand } from '@/api'
const srcs = [
  { src: '/static/jianpai.png', brand: '箭牌' },
  { src: '/static/wanzhengjiaju.png', brand: '完整家居' },
  { src: '/static/dongpeng.png', brand: '东鹏' },
  { src: '/static/shenghuojia.png', brand: '生活家' },
  { src: '/static/lejia.png', brand: '乐家' },
  { src: '/static/jinyitao.png', brand: '金意陶' },
  { src: '/static/toto.png', brand: 'TOTO' },
  { src: '/static/meibiao.png', brand: '美标' },
]
export default {
  name: 'Brand',
  data: () => ({
    brands: [],
  }),
  methods: {
    update() {
      getBrand().then(res => {
        // console.log(res)
        this.brands = res.map(i => {
          const sum = formatNum(i.sum)
          const src = srcs.find(s => s.brand === i.brand).src
          return { ...i, src, sum }
        })
      })
    },
  },
  created() {
    //do something after creating vue instance
    this.update()
    setInterval(this.update, 100000)
  },
}
</script>
<style scoped>

</style>
