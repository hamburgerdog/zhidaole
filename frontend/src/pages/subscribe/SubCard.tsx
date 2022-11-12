import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { formatDate } from "../index/components/IndexCard";
import "./index.less";

const InfoSide = ({
  sourceName,
  sourcePicUrl,
  sourceInfo,
  updateTime,
  amount
}: {
  sourceName: string;
  sourcePicUrl: string;
  sourceInfo: string;
  updateTime: Date;
  amount: number;
}) => {
  return (
    <View className="infoX">
      <View className="infoPicX">
        <Image className="infoPic" src={sourcePicUrl} />
      </View>
      <View className="infoContentX">
        <View className="icTitle">
          <text>{sourceName}</text>
        </View>
        <View className="icInfo">
          <text>{sourceInfo}</text>
        </View>
      </View>
      <View className="infoTipX">
        <View>
          <text>最近更新：{formatDate(updateTime)}</text>
        </View>
        <View>
          <text>共</text>
          <text className="numUnderline">{amount}</text>
          <text>条消息</text>
        </View>
      </View>
    </View>
  );
};

interface ITypeTags {
  type: string;
  tagName: string;
}

export interface IMessage {
  messageID: string;
  messageName: string;
  messaegContent: string;
}

const MessageListAside = ({
  typeTags,
  messages
}: {
  typeTags: ITypeTags[];
  messages: IMessage[];
}) => {
  return (
    <View className="msgListX">
      <View className="typeTagsX">
        {typeTags.map(({ type, tagName }) => (
          <View className="typeTag" key={type}>
            {tagName}
          </View>
        ))}
      </View>
      <View className="msgContentX">
        {messages.map(({ messageID, messageName, messaegContent }) => (
          <View className="msgX" key={messageID}>
            <text>{messageName}</text>
            <text> ｜ </text>
            <text>{messaegContent}</text>
          </View>
        ))}
      </View>
    </View>
  );
};

interface SubCardProps {
  sourceName: string;
  sourceInfo: string;
  sourcePicUrl: string;
  updateTime: Date;
  amount: number;
  handleClick: () => void;
}

export const SubCard = ({
  sourceName,
  sourceInfo,
  sourcePicUrl,
  updateTime,
  amount,
  handleClick
}: SubCardProps) => {
  const [typeTags] = useState<ITypeTags[]>([
    {
      type: "often",
      tagName: "常用"
    },
    {
      type: "recent",
      tagName: "最近"
    },
    {
      type: "daliy",
      tagName: "生活"
    },
    {
      type: "study",
      tagName: "学习"
    }
  ]);
  const [messages] = useState<IMessage[]>([
    {
      messageID: "0",
      messageName: "消息A",
      messaegContent: "消息简要内容"
    },
    {
      messageID: "1",
      messageName: "消息A",
      messaegContent: "消息简要内容"
    },
    {
      messageID: "2",
      messageName: "消息A",
      messaegContent: "消息简要内容"
    },
    {
      messageID: "3",
      messageName: "消息A",
      messaegContent: "消息简要内容"
    },
    {
      messageID: "4",
      messageName: "消息A",
      messaegContent: "消息简要内容"
    },
    {
      messageID: "5",
      messageName: "消息A",
      messaegContent: "消息简要内容"
    },
    {
      messageID: "6",
      messageName: "消息A",
      messaegContent: "消息简要内容"
    },
    {
      messageID: "7",
      messageName: "消息A",
      messaegContent: "消息简要内容"
    }
  ]);

  return (
    <View className="sCardX" onClick={handleClick}>
      <InfoSide
        sourceName={sourceName}
        sourceInfo={sourceInfo}
        sourcePicUrl={sourcePicUrl}
        updateTime={updateTime}
        amount={amount}
      />
      <MessageListAside typeTags={typeTags} messages={messages} />
    </View>
  );
};
