import ZhidaoleIcon from "@/assets/zhidaole.svg";
import { BackRow } from "@/components/BackRow";
import { Image, View } from "@tarojs/components";
import React from "react";
import "./index.less";

const ContributionList = [
  {
    label: "react",
    url: "https://cdn-icons-png.flaticon.com/512/753/753244.png"
  },
  {
    label: "javascript",
    url: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
  },
  {
    label: "typescript",
    url: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png"
  },
  {
    label: "golang",
    url:
      "https://user-images.githubusercontent.com/3613230/41752586-476b0b24-7596-11e8-95fe-8fd3faa21e8a.png"
  },
  {
    label: "java",
    url: "https://cdn-icons-png.flaticon.com/512/226/226777.png"
  },
  {
    label: "github",
    url: "https://cdn-icons-png.flaticon.com/512/2111/2111425.png"
  },
  {
    label: "evan_you",
    url: "https://avatars.githubusercontent.com/u/499550?v=4"
  },
  {
    label: "anthony_fu",
    url: "https://avatars.githubusercontent.com/u/11247099?v=4"
  },
  {
    label: "mqyqingfeng",
    url: "https://avatars.githubusercontent.com/u/11458263?v=4"
  },
  {
    label: "ruanyifeng",
    url: "https://avatars.githubusercontent.com/u/905434?v=4"
  },
  {
    label: "vscode",
    url:
      "https://t8.baidu.com/it/u=3709895125,627741970&fm=74&app=80&size=f256,256&n=0&f=PNG?sec=1650042000&t=80d9ad833fb099ed83776c6412d7d84e"
  },
  {
    label: "vim",
    url:
      "https://t8.baidu.com/it/u=3889393881,3355615260&fm=74&app=80&size=f256,256&n=0&f=PNG?sec=1650042000&t=e026852e76574b5fc94712901135b42a"
  },
  {
    label: "clash",
    url: "https://s1.ax1x.com/2022/04/14/LQGxI0.png"
  },
  {
    label: "wechat",
    url:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13590804244%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652461460&t=cdae90c6023e0770f45e4111c2743687"
  },
  {
    label: "taro",
    url: "https://taro-ui.jd.com/img/logo-taro.png"
  },
  {
    label: "one",
    url:
      "https://s1.ax1x.com/2022/04/14/LQJKzD.jpg"
  },
  {
    label: "two",
    url:
      "https://s1.ax1x.com/2022/04/14/LQJQQe.jpg"
  },
  {
    label: "three",
    url:
      "https://s1.ax1x.com/2022/04/14/LQJlsH.jpg"
  },
  {
    label: "four",
    url:
      "https://s1.ax1x.com/2022/04/14/LQJ1Ld.jpg"
  },
  {
    label: "gzhu",
    url:
      "https://gimg3.baidu.com/search/src=https%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fe29d14ce36d3d539963232e83d87e950352ab000.jpg&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=w240&n=0&g=0n&q=75&fmt=auto?sec=1650042000&t=797821ad8c048ad00ffdeac050277041"
  },
];

const SoftwareInformation = () => {
  return (
    <View className="fullPageX">
      <View className="packBackBtn">
        <BackRow />
      </View>
      <View className="header">
        <View className="info">
          <View className="iTitle">
            <text>知到啦</text>
          </View>
          <View className="iAuthor">
            <text>开发者: burger_</text>
          </View>
          <View className="iGithub">
            <text>hamburgerdog@github</text>
          </View>
        </View>
        <View className="iPhoto">
          <Image src={ZhidaoleIcon} />
        </View>
      </View>
      <View className="main">
        <View>
          <text>
            知到啦，一款简单易用、界面美观的消息管理小程序。
          </text>
        </View>
        <View>
          <text>
            使用Taro框架开发，拥有天生的跨端功能，支持Web端、微信小程序。
          </text>
        </View>
        <View>
          <text>就让我们的消息流动起来吧！通知到了。</text>
        </View>
      </View>
      <View className="foot">
        <View className="footTitle">
          <text>感谢以下开源项目/团队/个人的贡献</text>
        </View>
        <View className="footIconBox">
          {ContributionList.map(({ label, url }) => (
            <View className="footIcon">
              <Image src={url} imgProps={{alt:label}}/>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SoftwareInformation;
