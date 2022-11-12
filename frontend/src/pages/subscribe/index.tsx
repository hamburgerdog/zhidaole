import { userState } from "@/atom/user";
import { BottomAddButton } from "@/components/BottomAddButton";
import { EmptyComp } from "@/components/Empty";
import { TitleWithSearch } from "@/components/TitleWithSearch";
import { useTips } from "@/hooks/useTips";
import { getHttpImage } from "@/service/httpService";
import { searchUserSubReleaseSource } from "@/service/origin";
import { mapObjectToURLParams } from "@/utils/http";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "./index.less";
import { SubCard } from "./SubCard";

interface SubRelease {
  releaseID: string;
  releaseName: string;
  releaseInfo: string;
  releaseCoverUrl: string;
  updateTime: Date;
  amount: number;
}

const Subscribe = () => {
  const [user] = useRecoilState(userState);
  const [subReleaseList, setSubReleaseList] = useState<SubRelease[]>([]);
  const [keyword, setKeyword] = useState("");
  const { tipList, selectKey, setSelectKey } = useTips();

  const [filterReleaseList, setFilterReleaseList] = useState<SubRelease[]>([]);

  const handleSearch = useCallback(
    value => {
      setKeyword(value);
    },
    [keyword]
  );

  useEffect(() => {
    setFilterReleaseList(
      subReleaseList.filter(({ releaseName }) => releaseName.includes(keyword))
    );
  }, [subReleaseList, keyword]);

  const handleCreateSubcribe = () => {
    if (user.userID === null) {
      Taro.showToast({
        title: "请先登录账号",
        icon: "error",
        duration: 2000
      });
      return;
    }
    Taro.navigateTo({ url: "/pages/newSubSource/index" });
  };

  const handleCardNav = (releaseID: string, releaseSourceName: string) => {
    const params = mapObjectToURLParams({
      releaseID,
      releaseSourceName
    });
    Taro.navigateTo({ url: `/pages/subDetail/index${params}` });
  };

  useEffect(() => {
    (async () => {
      if (user.userID !== null) {
        const { data: releaseListFromHTTP } = await searchUserSubReleaseSource(
          user.userID
        );
        setSubReleaseList(
          releaseListFromHTTP.map(
            ({
              ReleaseSourceID,
              ReleaseSourceName,
              ReleaseSourceInfo,
              ReleaseSourceCoverUrl,
              UpdateTime,
              ReleaseMessageIDs
            }) => ({
              releaseID: ReleaseSourceID,
              releaseName: ReleaseSourceName,
              releaseInfo: ReleaseSourceInfo,
              releaseCoverUrl: ReleaseSourceCoverUrl,
              updateTime: new Date(UpdateTime),
              amount: ReleaseMessageIDs.length
            })
          )
        );
      } else if (subReleaseList.length !== 0) {
        setSubReleaseList([]);
      }
    })();
  }, [user]);

  return (
    <View className="subscribeX">
      <View className="headerX">
        <TitleWithSearch title="订阅源" handleSearch={handleSearch} />
        <View className="subBtnX">
          {tipList.map(({ label, key }) => (
            <text
              key={key}
              className={selectKey === key ? "highLightBtn" : ""}
              onClick={() => setSelectKey(key)}
            >
              {label}
            </text>
          ))}
        </View>
      </View>
      <View className="mainX">
        {filterReleaseList.length !== 0 ? (
          filterReleaseList.map(
            ({
              releaseID,
              releaseName,
              releaseInfo,
              releaseCoverUrl,
              amount,
              updateTime
            }) => (
              <View style={{ marginBottom: "16px" }}>
                <SubCard
                  handleClick={() => handleCardNav(releaseID, releaseName)}
                  sourceName={releaseName}
                  sourceInfo={releaseInfo}
                  sourcePicUrl={getHttpImage(releaseCoverUrl)}
                  amount={amount}
                  updateTime={updateTime}
                />
              </View>
            )
          )
        ) : (
          <View className="emptyCard">
            <EmptyComp height={300} width={300} tips="当前用户暂无订阅源消息" />
          </View>
        )}
      </View>
      <BottomAddButton handleClick={handleCreateSubcribe} />
    </View>
  );
};

export default Subscribe;
