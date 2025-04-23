---
title: 使用 Valaxy 搭建博客
date: 2025-04-23
updated: 2025-04-23
categories: 教程
aplayer: true
tags:
  - 教程
  - valaxy
top: 2
---

### 创建 Valaxy 项目

**前提条件: 安装了 `node.js`，未安装可以去 node.js 官网安装  [node.js](https://nodejs.org)**

1. 资源管理器打开你的博客存放的位置，在上方输入cmd，回车

![image-20250423132916180](https://s21.ax1x.com/2025/04/23/pEIWb5T.png)

2. 输入 `npm init valaxy`，等待初始化

  ```text
  npm init valaxy
  ```

![image-20250423133219051](https://s21.ax1x.com/2025/04/23/pEIWLPU.png)

3. 初始化完成后会自动开启服务，输入o可以打开浏览器预览

   ![image-20250423133359527](https://s21.ax1x.com/2025/04/23/pEIWOGF.png)

  到这里你的项目就创建完成了

---

### 目录结构

<p>接下来需要认识一下目录结构</p>

- `valaxy.config.ts`:  用户配置文件

- `site.config.ts`:  站点配置文件

- `styles`: 存放样式文件，覆盖主题样式，会自动加载 `index.xxx` 文件，例：`index.ts` / `index.scss` / `index.css`

- `public`: 存放静态文件，可以直接在文章中引用

- `pages`: 页面文件 其中的 `posts` 文件夹下存放文章

- `locales`: 国际化

- `components`: 存放 vue 组件，可以直接在 markdown 文件中使用，也可以覆盖原本的布局，如创建一个 `YunFooter.vue` 可以覆盖原本的样式

- `layouts`: 自定义布局

- `.vscode`:  推荐安装一些有用的 `VSCode` 插件，这样你可以直接预览一些图标、国际化、辅助的 CSS Class 等

  - 你可以在 VSCode 插件商店中找到 [`Valaxy` 插件](https://marketplace.visualstudio.com/items?itemName=yunyoujun.valaxy)，它提供了文章列表预览/切换/删除等功能，让你尽可能地可以在 VSCode 中完成所有操作。

- `.github`: 使用 `GitHub Actions` 自动构建并部署到 `GitHub Pages`

  你可以通过修改这些文件来自定义你的博客

---

### 部署

1. 自行部署

   执行 `npm run build` ，将生成的 `dist` 文件部署到自己的服务器上

2. 第三方部署

   第三方有很多中部署方式，例如 `GitHub Pages`，`Netlify`，`Vercel `... ，这里使用 `GitHub Pages` 的方式进行部署

   **前提条件 安装了 `git`， 没有安装可以去 git 官网安装 [Git - Downloads](https://git-scm.com/downloads)**

    - 打开 [github]([GitHub](https://github.com/))，创建仓库，注意：仓库名必须为 `用户名.github.io`，GitHub是国外的网站，由于周所周知的原因，最好挂梯子，没有梯子也可以使用 `Watt Toolkit`

    - 仓库创建好了以后，打开仓库，依次 `Settings` -> `Action` -> `General` -> `Workflow Permissions`，选择 `read and write permissions`，点击 `save` 保存

      ![image-20250423141741021](https://s21.ax1x.com/2025/04/23/pEIWX24.png)

    - 将项目上传至该仓库，依次 `Settings` -> `Pages` ，选择 `gh-pages`，点击 `save` 保存

      ![image-20250423142004361](https://s21.ax1x.com/2025/04/23/pEIWjxJ.png)

    - 点击 `Actions` 就可以看到正在部署，稍等一会之后点击 `pages build and deployment`，就可以看到网址了，点击就跳转到了你的博客了

      ![image-20250423142108599](https://s21.ax1x.com/2025/04/23/pEIHcad.png)

      ![image-20250423142210144](https://s21.ax1x.com/2025/04/23/pEIHgIA.png)

---

### 第三方插件

  你可以配置一些第三方插件使你的博客功能更加丰富，比如 `lightgallery`（相册）， `meting`（播放器）， `twikoo`（评论区）

- `meting`（播放器）

  - 添加依赖 `npm add valaxy-addon-meting'`

  - 全局音乐播放器

    ```ts
    // site.config.ts
    import { addonMeting } from 'valaxy-addon-meting' //添加Meting音乐播放器
    export default defineValaxyConfig<UserThemeConfig>({
        // site config see site.config.ts
        // ......
        addons: [
            // 全局音乐播放器，如需要配置，请查看https://github.com/metowolf/MetingJS
            addonMeting({
              global: true,
              /** @see https://github.com/metowolf/MetingJS */
              props: {
                id: 'xxx',
                server: 'tencent', // QQ音乐，网易云，酷狗
                type: 'song', // 单曲，专辑， 歌单
                mode: '',
                loop: 'all', // 循环
                autoplay: true, // 自动播放
                volume: 50, // 音量 50%
              },
            }),
        ]
        // ...
    })
    ```

  - 文章中的音乐播放器

    ```markdown
    <meting-js
     id="000PghTZ1AgWfU"
     server="tencent"
     type="song"
     theme="#C20C0C"
     list-max-height="600px"
     autoPlay="true">
    </meting-js>
    ```

- `lightgallery`（相册）

  - 添加依赖 `npm add valaxy-addon-lightgallery`

  - 创建相册页面 `albums`

    ```ts
    // valaxy.config.ts
    import { addonLightGallery } from 'valaxy-addon-lightgallery' // 相册
    export default defineValaxyConfig<UserThemeConfig>({
        // site config see site.config.ts
        // ......
        pages: [
          // ......
          {
            name: '相册',
            url: '/albums/',
            icon: 'i-ri-gallery-line',
            color: '#43abee',
          },
       ],
        // ...
    })
    ```

  - md 文件格式

    ```markdown
    ---
    layout: albums
    title: 相册
    icon: i-ri-gallery-line
    nav: false		# 关闭页面导航
    comment: true	# 关闭评论
    toc: false		# 关闭文章目录
    aside: false	# 关闭目录边栏
    albums:			# 相簿
      - caption: 天空
        url: /albums/sky
        cover: https://s21.ax1x.com/2025/04/22/pEIE4II.png
        desc:
      - caption: 猫
        url: /albums/cat
        cover: https://s21.ax1x.com/2025/04/22/pEIELLQ.png
        desc:
    ---
    ```

    ```markdown
    ---
    title: 天空
    layout: gallery
    nav: false
    toc: false
    aside: false
    photos:			# 照片
      - caption:
        src: https://s21.ax1x.com/2025/04/22/pEIEoJP.jpg
        desc:
      - caption:
        src: https://s21.ax1x.com/2025/04/22/pEIE4II.png
        desc:
      - caption:
        src: https://s21.ax1x.com/2025/04/22/pEIEbQS.jpg
        desc:
      - caption:
        src: https://s21.ax1x.com/2025/04/22/pEIVmJx.jpg
        desc:
    ---
    ```

    ```markdown
    ---
    title: 猫
    layout: gallery
    nav: false
    toc: false
    aside: false
    photos:			# 照片
      - caption:
        src: https://s21.ax1x.com/2025/04/22/pEIELLQ.png
        desc:
    ---
    ```

-  `twikoo`（评论区）

    - 添加依赖 `npm add valaxy-addon-twikoo`

    - `valaxy.config.ts`

      ```ts
      // valaxy.config.ts
      import { addonTwikoo } from 'valaxy-addon-twikoo'  //接入Twikoo评论系统
      export default defineValaxyConfig<UserThemeConfig>({
          // site config see site.config.ts
          // ......
          addons: [
                addonTwikoo({
                envId: '', // 自建服务地址
            }),
          ]
          // ...
      })
      ```

    - Twikoo 的配置查看 [Twikoo官方文档](https://twikoo.js.org/)

      这里简单说一下 Twikoo 的一种配置[Netlify 部署](https://twikoo.js.org/backend.html#netlify-部署)，这种部署方式国内访问会比较快，并且是免费的

      1. 首先注册`MongoDb Atlas` 账号，获取 MongoDB 连接字符串
      2. 注册 `Netify` 创建一个 `team`
      3. 打开 [twikoojs/twikoo-netlify](https://github.com/twikoojs/twikoo-netlify) 点击 `fork` 将仓库 fork 到自己的账号下
      4. 回到 `Netlify`，点击 `Add new site` -> `Import an existing project`
      5. 点击 `Deploy with GitHub`，如果未授权 `GitHub` 账号，先授权，然后选择前面 `fork` 的 `twikoo-netlify` 项目
      6. 点击 `Add environment variables` -> `New variable`，Key 输入 `MONGODB_URI`，`Value` 输入前面记录的数据库连接字符串，点击 `Deploy twikoo-netlify`
      7. 部署完成后，点击 `Domain settings` -> `右侧 Options` -> `Edit site name`，可以设置属于自己的三级域名`https://xxx.netlify.app`
      8. 进入 `Site overview`，点击上方的链接，如果环境配置正确，可以看到 “Twikoo 云函数运行正常” 的提示
      9. 云函数地址（包含 https:// 前缀和 /.netlify/functions/twikoo 后缀，例如 `https://xxx.netlify.app/.netlify/functions/twikoo`）即为您的环境 id