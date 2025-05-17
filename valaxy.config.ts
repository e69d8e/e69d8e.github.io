import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'

import { addonTwikoo } from 'valaxy-addon-twikoo'  //接入Twikoo评论系统
import { addonMeting } from 'valaxy-addon-meting' //添加Meting音乐播放器
import { addonLightGallery } from 'valaxy-addon-lightgallery' // 相册

// export default defineValaxyConfig({
//   addons: [
//     addonLightGallery(),
//   ],
// })


// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '無限进步',
    },


    pages: [
      {
        name: '分类',
        url: '/categories/',
        icon: 'i-ri-apps-line',
        color: 'dodgerblue',
      },
      {
        name: '标签',
        url: '/tags/',
        icon: 'i-ri-bookmark-3-line',
        color: 'dodgerblue',
      },
      {
        name: '相册',
        url: '/albums/',
        icon: 'i-ri-gallery-line',
        color: '#43abee',
      },
    ],

    footer: {
      since: 2024,
      powered: false,
      beian: {
        enable: false,
        icp: '',
      },
    },
  },
  siteConfig: {
    // 启用评论
    comment: {
      enable: true  //这里是评论的设置
    },
  },
    // 设置 valaxy-addon-twikoo 配置项
  addons: [
    addonTwikoo({ // https://twikoo-api-1.netlify.app/.netlify/functions/twikoo // Vercel部署
      envId: 'https://twikoo-api-1.netlify.app/.netlify/functions/twikoo', // 自建服务地址
    }),
    // 音乐播放器，如需要配置，请查看https://github.com/metowolf/MetingJS
    addonMeting({
      global: true,
      /** @see https://github.com/metowolf/MetingJS */
      props: { // 盗将行 000PghTZ1AgWfU // 城南花已开 0016hfoy28wyTn
        id: '0016hfoy28wyTn',
        server: 'tencent',
        type: 'song',
        mode: '',
        loop: 'all',
        autoplay: false,
        volume: 50,
      },
    }),
    addonLightGallery(), // 相册
  ],

  unocss: { safelist },
})
