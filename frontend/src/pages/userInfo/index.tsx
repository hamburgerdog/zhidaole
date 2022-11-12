import { BackRow } from "@/components/BackRow";
import { useUser } from "@/hooks/useUser";
import { DURATION } from "@/utils/config";
import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import "./index.less";

const UserInfo = () => {
  const [user, { userExit }] = useUser() as any;

  const handleUserExit = async () => {
    const { confirm } = await Taro.showModal({
      title: "退出用户",
      content: "请问是否退出当前用户？"
    });
    if (confirm) {
      await Taro.showToast({
        title: "用户已退出",
        icon: "success",
        duration: DURATION
      });
      setTimeout(() => {
        userExit();
        Taro.reLaunch({ url: "/pages/index/index" });
      }, DURATION);
    }
  };

  const handleUserCancel = async () => {
    const { confirm } = await Taro.showModal({
      title: "注销用户",
      content: "请确认是否注销用户？"
    });
    if (confirm) {
      await Taro.showToast({
        title: "用户已注销",
        icon: "success",
        duration: DURATION
      });
      setTimeout(() => {
        userExit();
        Taro.reLaunch({ url: "/pages/index/index" });
      }, DURATION);
    }
  };

  return (
    <View className="fullPageX">
      <View className="packBackBtn">
        <BackRow />
      </View>
      <View className="infoListBox">
        <View className="userPic">
          <Image src={(user as User).avatarUrl ?? ""} />
        </View>
        <View className="userTextX textEll">
          <text className="userName">{(user as User).nickName}</text>
        </View>
        <View className="userTextX textEll">
          <text className="userID">
            {(user as User).userID?.substring(0, 6)}
          </text>
        </View>
        <View className="userTextX textEll">
          <text className="userEmail">{(user as User).email || "nil"}</text>
        </View>
        <View className="userTextX textEll">
          <text className="pubReleaseInfo">100个，100条</text>
        </View>
        <View className="userTextX textEll">
          <text className="subReleaseInfo">99个，99条</text>
        </View>
        <View className="userTextX textEll">
          <text className="updateTime">2022/04/12</text>
        </View>
        <View className="userInfoBtn" onClick={handleUserExit}>
          <text>退出登录</text>
        </View>
        <View className="userInfoBtn fullfillBtn" onClick={handleUserCancel}>
          <text>注销账号</text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
