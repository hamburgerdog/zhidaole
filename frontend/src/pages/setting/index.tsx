import { useUser } from "@/hooks/useUser";
import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import "./index.less";

const SettingItem = ({ label, handleClick }) => {
  return (
    <View className="settingItemX" onClick={handleClick}>
      <View className="itemLeftIconX">
        <Image src="https://s1.ax1x.com/2022/03/26/qa8sNq.png" />
      </View>
      <View className="itemLabelX">
        <text>{label}</text>
      </View>
      <View className="itemRightIconX">
        <Image src="https://s1.ax1x.com/2022/03/26/qa8rEn.png" />
      </View>
    </View>
  );
};

const Setting = () => {
  const [user, { userLogin, userExit }] = useUser() as any;

  const handleLogin = () => {
    if (user.userID === null) {
      userLogin();
    } else {
      (async () => {
        const { confirm } = await Taro.showModal({
          title: "退出登录",
          content: "请问是否确认退出当前登录"
        });
        if (confirm) {
          userExit();
        }
      })();
    }
  };

  const settinConfigList = [
    {
      title: "个人信息",
      pageUrl: "/pages/userInfo/index"
    },
    {
      title: "意见反馈",
      pageUrl: "/pages/feedback/index"
    },
    {
      title: "缺陷报告",
      pageUrl: "/pages/defectReport/index"
    },
    {
      title: "软件信息",
      pageUrl: "/pages/softwareInformation/index"
    }
  ];

  return (
    <View className="settingX">
      <View className="headerX">
        <View className="userPicX">
          <Image src={user.avatarUrl ?? ""} onClick={handleLogin} />
        </View>
        <View className="userNameX">
          <text>{user.nickName ?? "请先登录用户"}</text>
        </View>
      </View>
      <View className="mainX">
        {settinConfigList.map(({ title, pageUrl }) => (
          <SettingItem
            label={title}
            handleClick={() => {
              if (title !== "软件信息" && user.userID === null) {
                Taro.showToast({
                  title: "请先登录账号",
                  icon: "error"
                });
                return;
              }
              Taro.navigateTo({ url: pageUrl });
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Setting;
