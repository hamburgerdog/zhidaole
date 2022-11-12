import Empty from "@/assets/empty.svg";
import { Image, View } from "@tarojs/components";
import React from "react";

export const EmptyComp = ({
  height,
  width,
  tips
}: {
  height?: number;
  width?: number;
  tips?: string;
}) => {
  return (
    <View style={{ height: height ?? 160, width: width ?? 160 }}>
      <Image style={{ height: "inherit", width: "inherit" }} src={Empty} />
      <View
        style={{
          color: "#C4CBD5",
          textAlign: "center",
          fontSize: 22,
          fontWeight: "bold",
          transform: "translateY(-50px)"
        }}
      >
        <text>{tips ?? "目前暂无数据"}</text>
      </View>
    </View>
  );
};
