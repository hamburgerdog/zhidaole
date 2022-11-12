export default {
  pages: [
    "pages/index/index",                  //  首页
    "pages/subscribe/index",              //  订阅源首页
    "pages/publish/index",                //  发布源首页
    "pages/setting/index",                //  设置页
    "pages/subDetail/index",              //  订阅源的详情页
    "pages/pubDetail/index",              //  源的详情页
    "pages/publishEdit/index",            //  发布/修改消息的详情页
    "pages/newPubSource/index",           //  新增发布源页
    "pages/newSubSource/index",           //  新增订阅源页
    "pages/messageDetail/index",          //  消息的详情页
    "pages/userInfo/index",               //  用户详情页
    "pages/feedback/index",               //  意见反馈页
    "pages/defectReport/index",           //  缺陷报告页
    "pages/softwareInformation/index",    //  软件介绍页  
  ],
  window: {
    navigationStyle: 'custom'
  },
  tabBar: {
    color: '#B7B7B7',
    selectedColor: '#4286C5',
    borderStyle: 'white',
    list: [
      {
        pagePath: "pages/index/index",
        text: '首页',
        iconPath: 'assets/icon/home.png',
        selectedIconPath: 'assets/icon/home-highlight.png'
      },
      {
        pagePath: "pages/subscribe/index",
        text: '订阅源',
        iconPath: 'assets/icon/on.png',
        selectedIconPath: 'assets/icon/on-highlight.png'
      },
      {
        pagePath: "pages/publish/index",
        text: '我的发布',
        iconPath: 'assets/icon/emit.png',
        selectedIconPath: 'assets/icon/emit-highlight.png'
      },
      {
        pagePath: "pages/setting/index",
        text: '设置',
        iconPath: 'assets/icon/setting.png',
        selectedIconPath: 'assets/icon/setting-highlight.png'
      },
    ]
  }
};
