import { BackRow } from "@/components/BackRow";
import { BottomAddButton } from "@/components/BottomAddButton";
import { EmptyComp } from "@/components/Empty";
import { TitleWithSearch } from "@/components/TitleWithSearch";
import {
  getMessageList,
  getMsgListByKeywordAndReleaseID
} from "@/service/message";
import { Message } from "@/service/type";
import { getCurPageOptions } from "@/utils/common";
import { mapObjectToURLParams } from "@/utils/http";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useCallback, useEffect, useState } from "react";
import { DetailCard } from "../subDetail/DetailCard";
import "./index.less";

const Detail = () => {
  const [releaseID, setReleaseID] = useState("");
  const [releaseName, setReleaseName] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

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

  const handleCardClick = useCallback(
    (message: Message) => {
      const param = JSON.stringify({ ...message, type: "pub", releaseName });
      Taro.navigateTo({ url: `/pages/messageDetail/index?json=${param}` });
    },
    [releaseName]
  );

  const newDetail = async () => {
    const param = mapObjectToURLParams({ releaseID, releaseName });
    Taro.redirectTo({ url: "/pages/publishEdit/index" + param });
  };

  const handleAddBtnClick = () => {
    newDetail();
  };

  useEffect(() => {
    const URLParam = getCurPageOptions() as {
      releaseID: string;
      releaseSourceName: string;
    };
    setReleaseID(URLParam.releaseID);
    setReleaseName(URLParam.releaseSourceName);
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
    <View className="commonPageX">
      <View className="headerX">
        <View className="backIconX">
          <BackRow />
        </View>
        <TitleWithSearch title={releaseName} handleSearch={handleSearch} />
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
      <View className="detailButtonX">
        <BottomAddButton handleClick={handleAddBtnClick} />
      </View>
    </View>
  );
};

export default Detail;
