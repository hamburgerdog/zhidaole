# xjosiah-simple-react-admin 模板

> 满足基本开发需求的 React 后台管理模板，推荐使用 class 语法进行开发

## 如何使用

```bash
# --------------- 初始化项目 ---------------------
# cd 当前项目文件
cd xjosiah-simple-react-admin
# 安装依赖
npm i
# 初始化 git 项目 并 挂载 git钩子
git init && npm run updateGitHook

# ---------------- 运行项目 ----------------------
# 使用 bundle模式 运行项目
npm run start
# 使用 noBundle模式 运行项目
npm run dev
# 打包项目
npm run build
# 提交代码
npm run commit
```

## 模板结构概览

```BASH
# xjosiah-simple-react-admin project
src
├───assets                          # 静态资源目录
│   └───icons                           # svg 请结合 Icon组件 使用
│
├───components                      # 项目通用的组件酷
│   └───HelloWorld                      # 单个组件
│
├───layout                          # 页面布局的配置
│   ├───component                       # 页面布局组件使用的组件
│   │   └───Header                          # 页面固定的头部
│   │       ├───HistroyHeader                   # 历史栏
│   │       ├───LanguaueSelector                # 国际化选择
│   │       └───UserItem                        # 用户登录功能
│   │
│   ├───index.jsx                       # 布局结构的页面，包含了 sider 和 Content
│   ├───index.module.less               # 布局的样式
│   ├───LayoutContent.jsx               # 布局的 Content 部分，包含了 Header 和 RouterContent
│   ├───LayoutHeader.jsx                # 布局的 Header 部分
│   └───LayoutSider.jsx                 # 布局的 Sider 部分
│
├───pages                           # 主页面，需要在路由的进行配置
│   ├───Home                            # 路由：path="/"
│   ├───Dashboard                       # 路由：path="dashboard"
│   ├───CodeReview                      # 路由：path="codeReview"
│   ├───DevTools                        # 路由：path="devTools"
│   └───TeamConfig                      # 路由：path="teamConfig"
│
├───router                          # 路由功能的配置
│   ├───index.jsx                       # 路由配置
│   └───withRouter.jsx                  # 依赖注入工具，为组件 props 提供路由的工具
│
├───store                           # 项目的状态管理仓库
│
├───locales                         # 国际化相关的文件
│
├──theme                            # 项目的 antd 主题样式修改
│
└───utils                           # 项目的通用工具类
    └───HoC
```

## 主要功能

- 提供基本的 admin 布局，双栏布局即 sider 加 content

- 提供基本的路由功能，简单即可满足页面路由

  - 默认使用 **hash** 的路由模式 ，如 主页：`http://$HOST/#/` 和 报表页：`http://$HOST/#/dashboard`

  - 开发环境下默认支持使用 **浏览器** 的路由模式

    - 将 `src/App.jsx` 下的 `<HashRouter>` 替换成 `<BrowserRouter>` 即可

    - **请注意：生产环境需要配置路由重定向到 `'http://$HOST/'` 下**

- 国际化相关

  - 使用 i18next 进行国际化配置，缓存文件存放在 `localStorage` 和 `sessionStorage`，配置可以看 `src/locales/config.js`

- 状态管理相关

  - 使用 react-redux 并集成了 redux-toolkit 工具

- 工程化相关

  - 提供基本的代码校验和样式格式化，推荐使用 VSCode 插件：`Prettier | ESLint `

  - 提供 git 提交的代码提示和规范限制

  - 使用 webpack5 进行开发和编译打包，同时在开发环境中兼容了 vite，支持用 noBundle 模式进行项目的启动
    - **注意：noBundle 模式下进行开发时，推荐在提交代码前通过 bundle 模式进行校验**

- 组件库相关

  - 原生集成 antd | ant-design/@icon 组件库
