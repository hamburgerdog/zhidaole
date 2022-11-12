import { userState } from "@/atom/user";
import { BottomAddButton } from "@/components/BottomAddButton";
import { EmptyComp } from "@/components/Empty";
import { TitleWithSearch } from "@/components/TitleWithSearch";
import { getHttpImage } from "@/service/httpService";
import { searchUserOwnReleaseSource } from "@/service/origin";
import { mapObjectToURLParams } from "@/utils/http";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { PubCard } from "./PubCard";

interface PubCardItem {
  releaseID: string;
  releaseName: string;
  releaseInfo: string;
  releaseCoverUrl: string;
}

const Publish = () => {
  const [user] = useRecoilState(userState);
  const [pubCardList, setPubCardList] = useState<PubCardItem[]>([]);

  const [keyword, setKeyword] = useState("");

  const [filterReleaseList, setFilterReleaseList] = useState<PubCardItem[]>([]);

  const handleSearch = useCallback(
    value => {
      setKeyword(value);
    },
    [keyword]
  );

  useEffect(() => {
    setFilterReleaseList(
      pubCardList.filter(({ releaseName }) => releaseName.includes(keyword))
    );
  }, [pubCardList, keyword]);

  const handleCreatePubcribe = () => {
    if (user.userID === null) {
      Taro.showToast({
        title: "请先登录账号",
        icon: "error",
        duration: 2000
      });
      return;
    }
    Taro.navigateTo({ url: "/pages/newPubSource/index" });
  };

  const handleCardNav = (releaseID: string, releaseSourceName: string) => {
    const params = mapObjectToURLParams({
      releaseID,
      releaseSourceName
    });
    Taro.navigateTo({ url: `/pages/pubDetail/index${params}` });
  };

  useEffect(() => {
    (async () => {
      if (user.userID !== null) {
        const { data } = await searchUserOwnReleaseSource(user.userID);
        setPubCardList(
          data.map(
            ({
              ReleaseSourceID,
              ReleaseSourceName,
              ReleaseSourceCoverUrl,
              ReleaseSourceInfo
            }) => ({
              releaseID: ReleaseSourceID,
              releaseCoverUrl: ReleaseSourceCoverUrl,
              releaseName: ReleaseSourceName,
              releaseInfo: ReleaseSourceInfo
            })
          )
        );
      } else if (pubCardList.length !== 0) {
        setPubCardList([]);
      }
    })();
  }, [user]);

  return (
    <View className="publishX">
      <View className="headerX">
        <TitleWithSearch title="发布源" handleSearch={handleSearch} />
      </View>
      <View className="mainX">
        {filterReleaseList.length !== 0 ? (
          filterReleaseList.map(
            ({ releaseID, releaseCoverUrl, releaseInfo, releaseName }) => (
              <PubCard
                sourceName={releaseName}
                sourceInfo={releaseInfo}
                sourcePicUrl={getHttpImage(releaseCoverUrl)}
                handleCardNav={() => {
                  handleCardNav(releaseID, releaseName);
                }}
              />
            )
          )
        ) : (
          <View className="emptyCard">
            <EmptyComp height={300} width={300} tips="当前用户暂无发布源消息" />
          </View>
        )}
      </View>
      <BottomAddButton handleClick={handleCreatePubcribe} />
    </View>
  );
};

export default Publish;
