<template>
  <div id="City" class="h-100 w-100 flex flex-column pb4" style="">
    <header class="pv1 mb2 flex-none" style="border-bottom:solid 2px #122c4d">
      <span class="db bl bw2 b--orange white pl2 lh-copy tracked">城市TOP10</span>
    </header>
    <main class="h-100 flex-auto">
     <ul class="list flex flex-column f6 h-100 justify-around" style=" color:#5486c9">
       <li class="flex pa2 tc" style="">
         <div class="w-20">排名</div>
         <div class="w-20">城市</div>
         <div class="w-40">销量</div>
         <div class="w-20">百分比</div>
       </li>
       <li :style="index < 5? 'color:#ff7800': 'color:#5486c9'"  style="" class="ph2 pt2 w-100 flex" v-for=" (c, index) in cities" :key="index">
        <div class="tc w-20">{{c.id}}</div>
        <div class="tc w-20">{{c.city}}</div>
        <div class="tr w-40" style="padding-right:1.4rem"
          :style="index < 5? 'color:#ff7800': 'color:#87a8d7'">{{c.sum}}</div>
        <div class="tc w-20">{{c.percentage}}%</div>
      </li>
     </ul>
    </main>
  </div>
</template>
<script>
import { formatNum } from '@/util'
import { getCity } from '@/api'
export default {
  name: 'City',
  data: () => ({
    cities: [],
  }),
  computed: {},
  methods: {
    update() {
      getCity().then(res => {
        // console.log(res)
        this.cities = res.slice(0, 10).map(c => {
          const sum = formatNum(c.sum)
          return { ...c, sum }
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
