import { View } from "@tarojs/components";
import React from "react";
import "./index.less";

export const BottomAddButton = props => {
  return (
    <View className="add_btn_wrap_x" onClick={props.handleClick}>
      <View className="add_btn_x">
        <View className="add_btn add_btn_row" />
        <View className="add_btn add_btn_col" />
      </View>
    </View>
  );
};
