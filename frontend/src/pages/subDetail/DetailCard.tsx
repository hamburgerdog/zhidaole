import { getHttpImage } from "@/service/httpService";
import { Message } from "@/service/type";
import { View, Image } from "@tarojs/components";
import React from "react";
import { formatDate } from "../index/components/IndexCard";
import "./index.less";

interface Props {
  message: Message;
  handleClick: (message: Message) => void;
}

export const DetailCard = ({ message, handleClick }: Props) => {
  const {
    msgTitle,
    subTitle,
    msgDetail,
    startTime,
    endTime,
    tips,
    connect,
    imgPathList,
    location: { title: address, lat, lng }
  } = message;

  return (
    <View onClick={() => handleClick(message)}>
      <View className="contentWrapX">
        <View className="cardTitleX">{msgTitle}</View>
        {subTitle ? (
          <View className="cardContentX">
            <View className="labelX">
              <text>副标题</text>
            </View>
            <View className="contentX textEll">
              <text>{subTitle}</text>
            </View>
          </View>
        ) : null}
        <View className="cardContentX">
          <View className="labelX">
            <text>消息内容</text>
          </View>
          <View className="contentX textEll">
            <text>{msgDetail}</text>
          </View>
        </View>
        {endTime.length !== 0 ? (
          <View className="cardContentX">
            <View className="labelX">
              <text>活动时间</text>
            </View>
            <View className="contentX textEll">
              <text>{`${startTime} 至 ${endTime}`}</text>
            </View>
          </View>
        ) : null}
        <View className="cardContentX">
          <View className="labelX">
            <text>联系方式</text>
          </View>
          <View className="contentX textEll">
            <text>{connect}</text>
          </View>
        </View>
        {tips.length !== 0 ? (
          <View className="cardContentX">
            <View className="labelX">
              <text>备注</text>
            </View>
            <View className="contentX textEll">
              <text>{tips}</text>
            </View>
          </View>
        ) : null}
        {address.length !== 0 ? (
          <View className="cardContentX">
            <View className="labelX">
              <text>活动地点</text>
            </View>
            <View className="contentX textEll">
              <text>{address}</text>
            </View>
          </View>
        ) : null}
        {imgPathList.length !== 0 ? (
          <View className="cardContentX imageRow">
            <View className="labelX simple">
              <text>图片</text>
            </View>
            <View className="imageX">
              {imgPathList.map(path => (
                <View className="image">
                  <Image src={getHttpImage(path)} />
                </View>
              ))}
            </View>
          </View>
        ) : null}
        <View className="cardTimeX">
          <text>最近编辑：</text>
          <text>{formatDate(new Date())}</text>
        </View>
      </View>
    </View>
  );
};
