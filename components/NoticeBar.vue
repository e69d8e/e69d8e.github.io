<script setup>
import { ref, onMounted } from 'vue';

const userIp = ref('');
const ipLocation = ref('');
const distance = ref(''); // 与站长的距离
const serverDistance = ref(''); // 与博客服务器的距离
const greeting = ref('');
const isLoading = ref(true);
const error = ref('');
const isVisible = ref(true); // 控制公告栏是否显示

// 根据IP地址获取城市信息
// const getCityCoordinates = async (ip) => {
//   const response = await fetch(`http://ip-api.com/json/${ip}`);
//   const data = await response.json();
//   //ipLocation.value = `${data.data.region.iso_code} ${data.data.region.name} ${data.data.city.name}` || '未知地区';

//   if (data.status === 'success') {
//     return { lat: parseFloat(data.lat), lon: parseFloat(data.lon) };
//   } else {
//     console.error('Failed to get city coordinates:', data);
//     return { lat: 0, lon: 0 }; // 默认值
//   }
// };

onMounted(async () => {
  try {
    const res = await fetch('https://api.nsmao.net/api/ipip/query?key=lHY1oFqNOseVmtH1tk6GNVbNh8').then(res => res.json());
    console.log(res);
    userIp.value = res.data.ip
    const userLocation = res.data
    if (userLocation.lat === 0 && userLocation.lng === 0) {
      throw new Error('无法获取有效的经纬度信息');
    }
    ipLocation.value = ` ${userLocation.country} ${userLocation.province} ${userLocation.city}` || '未知地区';  //这里请根据你的API灵活更改显示信息

    // 计算与站长的距离（设站长位置为）  //站长经纬度 lat 为纬度 lng 为经度
    const stationLocation = { lat: 27.1, lng: 115.02};
    distance.value = calculateDistance(stationLocation, userLocation).toFixed(2);

    // 博客服务器经纬度（设服务器位置为）
    const serverLocation = { lat: 37.8, lng: 115.42};
    // 计算与博客服务器的距离
    serverDistance.value = calculateDistance(serverLocation, userLocation).toFixed(2);

    // 根据时间生成问候语
    const hour = new Date().getHours();
    greeting.value = hour < 12 ? '早上好，美好的一天又开始了😎' : hour < 18 ? '下午好，累了就好好休息一下吧🎶' : '晚上好，在属于自己的时间里好好放松吧😶‍🌫️';
  } catch (err) {
    error.value = '无法加载公告信息，请稍后重试。刷新后如果问题仍然存在，请通过【替换为你的邮箱】联系我;'
    console.error('Error:', err);
  } finally {
    isLoading.value = false;
  }
});

function calculateDistance(loc1, loc2) {
  const R = 6371;
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 关闭公告栏
function closeNotice() {
  isVisible.value = false;
}
</script>

<template>
  <Transition name="slide">
    <div v-if="isVisible" class="notice-bar">
      <div class="notice-content">
        <button class="close-button" @click="closeNotice">×</button>
        <h3>公告</h3>
        <p v-if="isLoading">加载中...</p>
        <p v-else-if="error">{{ error }}</p>
        <template v-else>
          <p>  
            欢迎来自 <span class="city">{{ ipLocation }}</span> 的你 <br>
            <span class="greeting">{{ greeting }}</span>！你现在距离站长直线距离约
            <span class="distance">{{ distance }}</span> 公里，距离博客服务器直线距离约
            <span class="distance">{{ serverDistance }}</span> 公里。你当前的IP地址为:
            <span class="ip">{{ userIp }}</span>
          </p>
        </template>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.notice-bar {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.75); /* 不透明度降低到 75% */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 300px;
}

.notice-content {
  position: relative;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #000;
}

.notice-content h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.notice-content p {
  margin: 5px 0;
  font-size: 14px;
}

/* 颜色样式 */
.city {
  color: #5bbad5;
}

.greeting {
  color: #FFC0CB;
}

.distance {
  color: #5bbad5;
}

.ip {
  color: #5bd576;
}

/* 滑入滑出动画 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>