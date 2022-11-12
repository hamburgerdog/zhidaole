import ZhidaoleIcon from "@/assets/zhidaole.svg";
import { useUser } from "@/hooks/useUser";
import { mapObjectToURLParams } from "@/utils/http";
import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { formatDate, IndexCard } from "./components/IndexCard";
import "./index.less";

export const DEFAULT_AVATAR_URL = "";

const Index = () => {
  const [user, { userLogin }] = useUser();

  const handleLogin = async () => {
    if (user.userID === null) {
      await userLogin();
    } else {
      Taro.showToast({
        title: "用户已登录！",
        icon: "success"
      });
    }
  };

  const [msgList] = useState([
    {
      type: "high",
      amount: 50
    },
    {
      type: "mid",
      amount: 20
    },
    {
      type: "low",
      amount: 30
    },
    {
      amount: 10
    }
  ]);
  const [msgTotalAmount, setMsgTotalAmount] = useState(0);
  const [publishTotalAmount, setPublishTotalAmount] = useState(0);

  const [originInfoList] = useState([
    {
      originName: "消息源A",
      amount: 100
    },
    {
      originName: "消息源B",
      amount: 100
    },
    {
      originName: "消息源C",
      amount: 50
    }
  ]);

  useEffect(() => {
    setMsgTotalAmount(
      msgList.map(item => item.amount).reduce((pre, cur) => pre + cur)
    );
    setPublishTotalAmount(
      originInfoList.map(item => item.amount).reduce((pre, cur) => pre + cur)
    );
  }, [msgList, originInfoList]);

  return (
    <View className="homeX">
      <View className="headerX homeHeaderx">
        <View className="headerInfox">
          <View className="infoContent">
            <text>你好，</text>
            <text
              style={{ textDecorationLine: "underline" }}
              onClick={handleLogin}
            >
              {user.nickName ?? "请先登录"}
            </text>
          </View>
          <View className="infoPicWrapX">
            <View className="infoPicX">
              <Image
                className="infoPic"
                src={user.avatarUrl ?? DEFAULT_AVATAR_URL}
                onClick={handleLogin}
              />
            </View>
          </View>
        </View>
        <View className="headerBottomx">
          <View className="hbx subx">
            <View className="hbTitle">
              <text>欢迎光临</text>
              <text className="numUnderline">知道啦</text>
              <text>订阅消息。</text>
            </View>
            <View className="hbContent">
              {msgList.map(({ type, amount }) => {
                let messageType = "标准消息";
                switch (type) {
                  case "high":
                    messageType = "重要消息";
                    break;
                  case "mid":
                    messageType = "中等消息";
                    break;
                  case "low":
                    messageType = "次要消息";
                    break;
                  default:
                    break;
                }
                return (
                  <View key={type}>
                    <text>{messageType}</text>
                    <text className="numUnderline">{amount}</text>
                    <text>条</text>
                  </View>
                );
              })}
            </View>
          </View>
          <View className="hbx pubx">
            <View className="pbTitle">
              <text>发布消息</text>
              <text className="numUnderline">开始</text>
            </View>
            <View className="pbBarPicx">
              <Image
                className="pbBar"
                src="https://s1.ax1x.com/2022/03/22/qKLYYF.png"
              />
            </View>
            <View className="pbContent">
              <text className="pbContentTitle">您管理的消息源如下:</text>
              <View className="pbContent">
                {originInfoList
                  .slice(0, 3)
                  .map(({ originName, amount }, index) => {
                    return (
                      <>
                        <text>{originName}发布了</text>
                        <text className="numUnderline">{amount}</text>
                        <text>条消息{index !== 2 ? "；" : "..."}</text>
                      </>
                    );
                  })}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="mainX">
        <View className="mainBtnX">
          <View className="mainBtn">
            <text>消息收藏</text>
          </View>
          <View className="mainBtn">
            <text>订阅通知</text>
          </View>
          <View className="mainBtn">
            <text>发布通知</text>
          </View>
        </View>
        <View>
          <IndexCard
            type="msg"
            title="欢迎光临知到啦 👏"
            sourceName="系统通知"
            content={[
              "1. 知到啦 ，是一款简单易用兼具界面美观的消息管理小程序",
              "2. 使用了Taro框架开发，支持Web端、微信/支付宝等平台",
              "3. 主要目的是为了更好地收集管理每日的消息通知",
              "4. 欢迎登录尝试一下吧～"
            ]}
            tips={`当前时间：${formatDate(new Date())}`}
            handleClick={() => {
              const message = {
                type: "sub",
                messageID: "",
                releaseName: "系统通知源",
                connect: "hamburgerdog@github.io",
                endTime: "无限制期限",
                imgPathList: [
                  "static/img/zhidaole.png",
                  "static/img/ts.png",
                  "static/img/github.png"
                ],
                location: {
                  id: "13312067177286936125",
                  title: "计算机科学与网络工程学院",
                  address: "广东省广州市番禺区大学城外环西路230号",
                  lat: "23.0416149034392",
                  lng: "113.372635414442"
                },
                msgDetail:
                  "知到啦 ，是一款简单易用兼具界面美观的消息管理小程序，使用了Taro框架开发，支持Web端、微信/支付宝等平台。主要目的是为了更好地收集管理每日的消息通知欢迎登录尝试一下吧～",
                msgTitle: "欢迎光临知到啦 👏",
                releaseSourceID: "",
                startTime: "无限制期限 ",
                subTitle: "系统通知",
                tips: "请先登录后使用～"
              };
              const params = JSON.stringify(message);
              Taro.navigateTo({
                url: "/pages/messageDetail/index?json=" + params
              });
            }}
          />
          <IndexCard
            type="source"
            sourceName="订阅源消息示范·校园通知"
            messageList={[
              {
                msgName: "校园十佳歌手",
                shortContent: "第三届「校园十佳歌手」开赛啦！快来参加报名吧..."
              },
              {
                msgName: "校园环保卫士",
                shortContent: "近期「校园环保卫士」活动热烈展开中，欢迎查看..."
              },
              {
                msgName: "知识分享主题",
                shortContent: "本次「知识分享主题」由 X教授 指导，欢迎参加..."
              },
              {
                msgName: "舞动校园青春",
                shortContent: "活动「舞动校园青春」预备！请小伙伴们踊跃报名..."
              },
              {
                msgName: "环校越野跑步",
                shortContent: "运动「环校越野跑步」青春进行时，欢迎伙伴参与..."
              }
            ]}
            updateTime={new Date()}
          />
          <IndexCard
            type="source"
            sourceName="我发布的消息源·生活贴士"
            messageList={[
              {
                msgName: "语言的艺术",
                shortContent: "我长话短说，但是说来话长..."
              },
              {
                msgName: "具体的情况",
                shortContent: "情况就是这么个情况，具体什么情况，还得看情况..."
              },
              {
                msgName: "分享的知识",
                shortContent: "据我所知，我一无所知..."
              },
              {
                msgName: "正确的猜想",
                shortContent: "如果我没猜错的话，那我一定是猜对了。..."
              },
              {
                msgName: "一定的道理",
                shortContent: "但凡你这话有点道理，也不至于一点道理没有..."
              }
            ]}
            updateTime={new Date()}
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
