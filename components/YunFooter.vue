<script setup>
import NoticeBar from './NoticeBar.vue';
import { ref, onMounted, onUnmounted } from 'vue'

// 自定义链接
// const customLinks = [
//   {
//     name: '开往',
//     link: 'https://www.travellings.cn/go-by-clouds.html',
//     icon: 'https://www.travellings.cn/assets/logo.gif',
//   },
// ]

// 旅行者一号距离地球的信息
const voyagerDistance = ref('正在加载...')

// 模拟获取旅行者一号距离
const getVoyagerDistance = () => {
  const now = new Date()
  const start = new Date('01/17/2024 00:00:00') // 旅行者1号开始计算的时间
  const timeDifferenceInSeconds = (now.getTime() - start.getTime()) / 1000 // 转换为秒
  const distanceInKilometers = Math.trunc(23400000000 + timeDifferenceInSeconds * 17) // 距离=秒数*速度
  const astronomicalUnits = (distanceInKilometers / 149600000).toFixed(6) // 天文单位

  voyagerDistance.value = `旅行者 1 号当前距离地球 ${distanceInKilometers.toLocaleString()} 千米，约为 ${astronomicalUnits} 个天文单位 🚀`
}

// 定时器
let intervalId = null

onMounted(() => {
  getVoyagerDistance() // 初始化数据
  intervalId = setInterval(getVoyagerDistance, 1000) // 每秒更新一次
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId) // 组件卸载时清除定时器
  }
})
</script>

<template>
  <!-- 自定义链接 -->
  <!-- <div class="custom-links flex justify-center items-center gap-2" p="1">
    <template v-for="(link, index) in customLinks" :key="index">
      <template v-if="link.icon">
        <a :href="link.link" target="_blank" rel="noopener">
          <img :src="link.icon" :alt="link.name" />
        </a>
      </template>
      <template v-else>
        <a :href="link.link" target="_blank" rel="noopener">{{ link.name }}</a>
      </template>
      <span v-if="index < customLinks.length - 1"> |</span>
    </template>
  </div> -->

  <!-- 旅行者一号距离地球的信息 -->
 <div class="yun-footer">
    <NoticeBar />
    <div class="voyager-distance" m="y-2">
      {{ voyagerDistance }}
    </div>
    <div class="beian">© 2025  li · 个人网站</div>
 </div>
</template>

<style lang="scss" scoped>
// .custom-links img {
//   height: 20px; /* 根据需要调整图标大小 */
//   vertical-align: middle;
// }

.yun-footer {
  .voyager-distance {
    margin-top: 18px;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
  .beian {
    text-align: center;
      font-size: 12px;
      color: #999;
      padding: 18px 0;
  }
}
</style>