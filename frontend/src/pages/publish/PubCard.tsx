import { Image, View } from "@tarojs/components";
import React, { useState } from "react";
import { IMessage } from "../subscribe/SubCard";
import "./index.less";

const InfoSide = ({
  sourceInfo,
  sourcePicUrl
}: {
  sourceInfo: string;
  sourcePicUrl: string;
}) => (
  <View className="sourceInfoX">
    <View className="infoPicX">
      <Image className="infoPic" src={sourcePicUrl} />
    </View>
    <View className="infoX">
      <text>{sourceInfo}</text>
    </View>
  </View>
);

const MessagesList = ({
  sourceName,
  messages
}: {
  sourceName: string;
  messages: IMessage[];
}) => (
  <View className="msgListX">
    <View className="msgListTitleX">
      <text>{sourceName}</text>
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

interface PubCardProps {
  sourceName: string;
  sourceInfo: string;
  sourcePicUrl: string;
  handleCardNav: () => void;
}

export const PubCard = ({
  sourceInfo,
  sourceName,
  sourcePicUrl,
  handleCardNav
}: PubCardProps) => {
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
    <View className="pubCardX" onClick={() => handleCardNav()}>
      <InfoSide sourceInfo={sourceInfo} sourcePicUrl={sourcePicUrl} />
      <MessagesList sourceName={sourceName} messages={messages} />
    </View>
  );
};
