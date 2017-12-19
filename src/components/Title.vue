<template>
  <div id="Title" class='white w-100 flex justify-center flex-wrap'>
    <div class="w-100 tc">
      <img class="w-40" src="/static/zhutiwenan.png" alt="主题">
    </div>
    <section class="flex flex-wrap w-100" style="width: 13rem">
      <img src="/static/logo.png" alt="东箭logo" class="w-100">
      <div class="flex flex-wrap">
        <p class=" w-100 tc pt2 tracked">{{now[0]}}</p>
        <p class=" w-100 tc pt2 tracked">{{now[1]}}</p>
      </div>
    </section>
    <section class="flex justify-center pl2 pt2">
      <div class="br2 ba pa2 f1-ns f4" v-for="(num,index) in newSum"
        style=" border-color: #23426e; background: #132b4d"
        :class="index === 2 || index === 5 ? 'mr3-ns mr1':'mr1'"
      >
        {{num}}
      </div>
    </section>
  </div>
</template>
<script>
import { getNow } from "@/util"
import { getSales } from "@/api"
export default {
  name: "Title",
  data: () => ({
    sum: "0",
    now: ["", ""],
  }),

  computed: {
    newSum() {
      const len = this.sum.length
      let newStr = this.sum
      for (let i = 0; i < 9 - len; i++) {
        newStr = "0" + newStr
      }
      return newStr
    },
  },
  methods: {
    update() {
      getSales().then(res => {
        this.sum = res[0].sum.toString()
        // console.log(this.newSum)
      })
    },
  },

  mounted() {
    this.now = getNow()
    this.update()
    setInterval(() => {
      this.now = getNow()
    }, 500)
    setInterval(this.update, 100000)
  },
}
</script>
<style scoped>

</style>
