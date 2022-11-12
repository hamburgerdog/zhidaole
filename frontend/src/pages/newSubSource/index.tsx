import { BackRow } from "@/components/BackRow";
import { useUser } from "@/hooks/useUser";
import { getHttpImage } from "@/service/httpService";
import { getReleaseWithKeyword } from "@/service/origin";
import { subRelease } from "@/service/user";
import { Image, Input, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useMemo, useState } from "react";
import "./index.less";

interface SubSource {
  sourceID: string;
  sourceName: string;
  coverUrl: string;
  updateTime: string;
}

const NewSubSource = () => {
  const [user, { updateUser }] = useUser() as any;

  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);
  const [subSourceList, setSubSourceList] = useState<SubSource[]>([]);
  const [curSelectID, setCurSelectID] = useState<SubSource["sourceID"]>("");

  const curSelectItem = useMemo(() => {
    return subSourceList.find(({ sourceID }) => sourceID === curSelectID);
  }, [curSelectID]);

  const handleSearch = (keyword: string) => {
    if (searchTimer !== null) {
      clearTimeout(searchTimer);
    }
    const timer = setTimeout(async () => {
      const { data } = await getReleaseWithKeyword(keyword);
      setSubSourceList(
        data.map(
          item =>
            ({
              sourceID: item.ReleaseSourceID,
              sourceName: item.ReleaseSourceName,
              coverUrl: item.ReleaseSourceCoverUrl,
              updateTime: item.UpdateTime
            } as SubSource)
        )
      );
      setSearchTimer(null);
    }, 200);
    setSearchTimer(timer);
  };

  const handleCancel = async () => {
    const { confirm } = await Taro.showModal({
      title: "取消选择",
      content: "请确认是否取消当前选择？"
    });
    if (confirm) {
      setCurSelectID("");
    }
  };

  const handleConfirm = async () => {
    if (curSelectID.length === 0) {
      Taro.showToast({
        title: "当前无选中的源",
        icon: "error"
      });
      return;
    }
    const { confirm } = await Taro.showModal({
      title: "订阅消息源",
      content: "请确认是否订阅该消息源？"
    });
    if (confirm) {
      const {
        code,
        data: { SubscribedSourcesIDs }
      } = await subRelease(
        ((user as unknown) as User).userID as string,
        curSelectItem!.sourceID
      );
      if (Number(code) === 0) {
        (updateUser as (item: Partial<User>) => void)({
          subscribedSourcesIDList: SubscribedSourcesIDs
        });
        const { confirm } = await Taro.showModal({
          title: "订阅成功",
          content: "请问是否返回主界面？"
        });
        if (confirm) {
          Taro.navigateBack();
        }
      } else {
        Taro.showToast({
          title: "订阅失败",
          icon: "error"
        });
      }
    }
  };

  return (
    <View className="commonPageX">
      <View className="headerX">
        <View className="backIconX">
          <BackRow />
        </View>
        <View className="headerText">
          <text>新增订阅源</text>
        </View>
      </View>
      <View className="mainX">
        <View className="searchCardX">
          <View className="searchWrapX">
            <View className="searchLabel">
              <text>请搜索源的名字/ID</text>
            </View>
            <View className="searchX">
              <Input
                onInput={({ detail: { value } }) => {
                  handleSearch(value);
                }}
              />
            </View>
          </View>
          <View className="contentX">
            <View className="uploadAside">
              <View className="uploadTitle">识别源卡片</View>
              <View className="uploadBtn">
                <text>+</text>
              </View>
              <View className="moreLine"></View>
            </View>
            <View className="searchResult">
              {subSourceList.map(({ sourceID, sourceName }) => (
                <View
                  className="resultItem"
                  key={sourceID}
                  onClick={() => setCurSelectID(sourceID)}
                >
                  <text>{sourceName}</text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View className="resultCardX">
          <View className="infoWrapX">
            <View className="cardInfo">
              <View className="cardTextBox">
                <View className="cardLabel">
                  <text>ID</text>
                </View>
                <View className="cardText">
                  <text>{curSelectItem ? curSelectItem.sourceID : ""}</text>
                </View>
              </View>
              <View className="cardTextBox">
                <View className="cardLabel">
                  <text>名称</text>
                </View>
                <View className="cardText">
                  <text>
                    {curSelectItem
                      ? curSelectItem.sourceName
                      : "暂无选中发布源"}
                  </text>
                </View>
              </View>
              <View className="cardTextBox">
                <View className="cardLabel">
                  <text>最近更新</text>
                </View>
                <View className="cardText">
                  <text>{curSelectItem ? curSelectItem.updateTime : ""}</text>
                </View>
              </View>
            </View>
            <View className="cardPic">
              <Image
                src={curSelectItem ? getHttpImage(curSelectItem.coverUrl) : ""}
              />
            </View>
          </View>
          <View className="cardBtnX">
            <View className="cancelBtn" onClick={handleCancel}>
              <text>取消</text>
            </View>
            <View className="confirmBtn" onClick={handleConfirm}>
              <text>添加</text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewSubSource;
