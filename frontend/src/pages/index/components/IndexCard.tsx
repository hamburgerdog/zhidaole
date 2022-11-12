import { View } from "@tarojs/components";
import React from "react";
import "./index.less";

type IndexCardProps =
  | {
      type: "msg";
      title: string;
      sourceName: string;
      content: string;
      tips: string;
      handleClick?: () => void;
    }
  | {
      type: "source";
      sourceName: string;
      messageList: {
        msgName: string;
        shortContent: string;
      }[];
      updateTime: Date;
    };

const MessageTitle = ({
  title,
  sourceName
}: {
  title: string;
  sourceName: string;
}) => (
  <View className="iCardTitle">
    <text>{title}</text>
    <text> | </text>
    <text>{sourceName}</text>
  </View>
);

export const formatDate = (date: Date) =>
  `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

export const IndexCard = (props: IndexCardProps) => {
  return (
    <View className="indexCardX">
      {props.type === "msg" ? (
        <View onClick={props.handleClick}>
          <MessageTitle title={props.title} sourceName={props.sourceName} />
          {Array.isArray(props.content) ? (
            props.content.map(text => (
              <View className="iCardContent">
                <text>{text}</text>
              </View>
            ))
          ) : (
            <View className="iCardContent">
              <text>{props.content}</text>
            </View>
          )}
          <View className="iCardTips">{props.tips}</View>
        </View>
      ) : (
        <View>
          <View className="iCardTitle">
            <text>{props.sourceName}</text>
          </View>
          <View className="iCardContent">
            {props.messageList.map(({ msgName, shortContent }) => (
              <View>
                <text>{msgName}</text>
                <text> | </text>
                <text>{shortContent}</text>
              </View>
            ))}
          </View>
          <View className="iCardTips">
            <text>最近更新：</text>
            <text>{formatDate(props.updateTime)}</text>
          </View>
        </View>
      )}
    </View>
  );
};
