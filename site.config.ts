import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://e69doe.github.io/', // 网站的url
  lang: 'zh-CN', // 语言
  title: '首页', // 网站的标题
  subtitle: 'hello', // 网站副标题
  favicon: 'https://s21.ax1x.com/2025/04/21/pE5NDEt.jpg', // 网站的favicon
  author: {
    name: 'Li', // 作者的名字
    avatar: 'https://s21.ax1x.com/2025/04/21/pE5NDEt.jpg', // 作者的头像
    email: 'e69d8e1026@gmail.com', // 作者的邮箱
    status: {
      emoji: '😋'	// 头像旁边的emoji
    },
  },
  description: 'e69d8e的博客', // 网站的描述
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com/e69d8e',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'E-Mail',
      link: 'mailto:e69d8e@gmail.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
  ],

  search: {
    enable: false,
  },

  sponsor: {
    enable: false,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: '',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: '',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: '',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})
