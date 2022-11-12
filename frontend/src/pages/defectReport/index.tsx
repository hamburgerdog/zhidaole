import { BackRow } from "@/components/BackRow";
import CancelAntConfirmBtn from "@/components/CancelAndConfirmBtn";
import { DURATION } from "@/utils/config";
import { Input, Textarea, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import "./index.less";

const defectTypeListConfig = [
  {
    label: "首页",
    value: "home"
  },
  {
    label: "订阅源",
    value: "sub"
  },
  {
    label: "发布源",
    value: "pub"
  },
  {
    label: "新增发布源",
    value: "newPub"
  },
  {
    label: "发布详情",
    value: "pubDetail"
  },
  {
    label: "新增订阅源",
    value: "newSub"
  },
  {
    label: "订阅详情",
    value: "subDetail"
  },
  {
    label: "发布/修改消息",
    value: "newAndEdit"
  },
  {
    label: "设置",
    value: "setting"
  }
];

type DefectType = typeof defectTypeListConfig[0];

const DefectReport = () => {
  const [selectItemValue, setSelectItemValue] = useState<
    DefectType["value"] | null
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
      <View className="defectItem">
        <text className="dfItemLabel">请选择您要反馈的意见类型：</text>
        <View className="defectType">
          {defectTypeListConfig.map(({ label, value }) => (
            <View
              className={`dfTypeBtn ${
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
      <View className="defectItem">
        <text className="dfItemLabel">请简单描述缺陷的表现：</text>
        <View className="dfInput">
          <Input />
        </View>
      </View>
      <View className="defectItem">
        <text className="dfItemLabel">请简单描述期待的改进方式：</text>
        <View className="dfTextArea smallTextArea">
          <Textarea maxlength={140} />
        </View>
      </View>
      <View className="defectItem">
        <text className="dfItemLabel">欢迎输入您的联系方式：</text>
        <View className="dfInput">
          <Input />
        </View>
      </View>
      <View className="dfCommitBtn">
        <CancelAntConfirmBtn
          handleCancel={handleCancel}
          handleConfirm={handleComfirm}
        />
      </View>
    </View>
  );
};

export default DefectReport;
