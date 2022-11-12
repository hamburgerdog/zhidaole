import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";

export const BackRow = ({ handleClick }: { handleClick?: () => void }) => (
  <View
    className="rowIconX"
    onClick={() => (handleClick ? handleClick() : Taro.navigateBack())}
  >
    <Image src="https://s1.ax1x.com/2022/03/26/qa8rEn.png" />
  </View>
);
