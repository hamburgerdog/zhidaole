import { BackRow } from "@/components/BackRow";
import { EmptyComp } from "@/components/Empty";
import { TitleWithSearch } from "@/components/TitleWithSearch";
import { useTips } from "@/hooks/useTips";
import {
  getMessageList,
  getMsgListByKeywordAndReleaseID
} from "@/service/message";
import { Message } from "@/service/type";
import { getCurPageOptions } from "@/utils/common";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useCallback, useEffect, useState } from "react";
import { DetailCard } from "./DetailCard";
import "./index.less";

const Detail = () => {
  const [releaseID, setReleaseID] = useState("");
  const [releaseName, setReleaseName] = useState("测试一下创建功能");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const { tipList, selectKey, setSelectKey } = useTips();

  const handleSearch = useCallback(
    async (keyword: string) => {
      const { data } = await getMsgListByKeywordAndReleaseID(
        releaseID,
        keyword
      );
      if (data !== undefined) {
        setMessageList(data);
      }
    },
    [releaseID]
  );

  const handleCardClick = useCallback((message: Message) => {
    const param = JSON.stringify({ ...message, type: "sub", releaseName });
    Taro.navigateTo({ url: `/pages/messageDetail/index?json=${param}` });
  }, []);

  useEffect(() => {
    const URLParam = getCurPageOptions() as {
      releaseID: string;
      releaseSourceName: string;
    };
    if (URLParam.releaseID && URLParam.releaseID.length !== 0) {
      setReleaseID(URLParam.releaseID);
      setReleaseName(URLParam.releaseSourceName);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (releaseID && releaseID.length !== 0) {
        const { data } = await getMessageList(releaseID);
        if (data !== undefined) {
          setMessageList(data);
        }
      }
    })();
  }, [releaseID]);

  return (
    <View className="commonPageX subDetailX">
      <View className="headerX">
        <View className="backIconX">
          <BackRow />
        </View>
        <TitleWithSearch title={releaseName} handleSearch={handleSearch} />
        <View className="filterBtnX">
          {tipList.map(({ label, key }) => (
            <text
              key={key}
              className={selectKey === key ? "highLightBtn" : ""}
              onClick={() => {
                setSelectKey(key);
              }}
            >
              {label}
            </text>
          ))}
        </View>
      </View>
      <View className="mainX">
        {messageList && messageList.length !== 0 ? (
          messageList.map(message => (
            <View style={{ marginBottom: "16px" }}>
              <DetailCard message={message} handleClick={handleCardClick} />
            </View>
          ))
        ) : (
          <View className="emptyX">
            <EmptyComp height={320} width={320} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Detail;
