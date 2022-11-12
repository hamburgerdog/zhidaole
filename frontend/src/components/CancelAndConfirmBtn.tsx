import { View } from "@tarojs/components";
import React from "react";
import "./index.less";

interface IProps {
  handleCancel: () => void;
  handleConfirm: () => void;
}

const CancelAntConfirmBtn = ({ handleCancel, handleConfirm }: IProps) => {
  return (
    <View className="optBtnX">
      <View className="cencalBtn" onClick={() => handleCancel()}>
        <text>取消</text>
      </View>
      <View className="confirmBtn" onClick={() => handleConfirm()}>
        <text>提交</text>
      </View>
    </View>
  );
};

export default CancelAntConfirmBtn;
