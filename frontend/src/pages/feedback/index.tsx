import { BackRow } from "@/components/BackRow";
import CancelAntConfirmBtn from "@/components/CancelAndConfirmBtn";
import { DURATION } from "@/utils/config";
import { Input, Textarea, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import "./index.less";

const feedBackTypeListConfig = [
  {
    label: "功能",
    value: "0"
  },
  {
    label: "体验",
    value: "1"
  },
  {
    label: "隐私",
    value: "2"
  },
  {
    label: "失真",
    value: "3"
  },
  {
    label: "其他",
    value: "4"
  }
];

type FeedBackType = typeof feedBackTypeListConfig[0];

const FeedBack = () => {
  const [selectItemValue, setSelectItemValue] = useState<
    FeedBackType["value"] | null
  >(null);

  const handleCancel = async () => {
    const { confirm } = await Taro.showModal({
      title: "取消提交",
      content: "请确认是否取消提交"
    });
    if (confirm) {
      Taro.navigateBack();
    }
  };

  const handleComfirm = async () => {
    const { confirm } = await Taro.showModal({
      title: "确认提交",
      content: "请确认是否提交反馈"
    });
    if (confirm) {
      Taro.showToast({
        title: "提交成功",
        icon: "success",
        duration: DURATION
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, DURATION);
    }
  };

  return (
    <View className="fullPageX">
      <View className="packBackBtn">
        <BackRow />
      </View>
      <View className="feedBackItem">
        <text className="fdItemLabel">请选择您要反馈的意见类型：</text>
        <View className="feedBackType">
          {feedBackTypeListConfig.map(({ label, value }) => (
            <View
              className={`fbTypeBtn ${
                selectItemValue !== null && selectItemValue === value
                  ? "btnHight"
                  : ""
              }`}
              key={value}
              onClick={() => setSelectItemValue(value)}
            >
              {label}
            </View>
          ))}
        </View>
      </View>
      <View className="feedBackItem">
        <text className="fdItemLabel">请简单描述意见的内容：</text>
        <View className="fbTextArea">
          <Textarea maxlength={180} />
        </View>
      </View>
      <View className="feedBackItem">
        <text className="fdItemLabel">请简单描述期待的改进方式：</text>
        <View className="fbTextArea smallTextArea">
          <Textarea maxlength={140} />
        </View>
      </View>
      <View className="feedBackItem">
        <text className="fdItemLabel">欢迎输入您的联系方式：</text>
        <View className="fbInput">
          <Input />
        </View>
      </View>
      <View className="fbCommitBtn">
        <CancelAntConfirmBtn
          handleCancel={handleCancel}
          handleConfirm={handleComfirm}
        />
      </View>
    </View>
  );
};

export default FeedBack;
