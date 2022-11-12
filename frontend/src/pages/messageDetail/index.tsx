import { getHttpImage } from "@/service/httpService";
import { Message } from "@/service/type";
import { getCurPageOptions } from "@/utils/common";
import { Image, Map, View } from "@tarojs/components";
import React, { useCallback, useEffect, useState } from "react";
import { formatDate } from "../index/components/IndexCard";
import iconPath from "@/assets/icon/home-highlight.png";

import "./index.less";
import { BackRow } from "@/components/BackRow";
import { mapObjectToURLParams } from "@/utils/http";
import Taro from "@tarojs/taro";
import { delMsgByID } from "@/service/message";
import { DURATION } from "@/utils/config";

interface IMessageDetail extends Message {
  type: "sub" | "pub";
  releaseName: string;
}

const MessageDetail = () => {
  const [message, setMessage] = useState<IMessageDetail>();

  const handleLike = useCallback(() => {}, []);
  const handleFixTop = useCallback(() => {}, []);
  const handleEdit = useCallback(() => {
    const param = mapObjectToURLParams({
      messageID: message?.messageID,
      releaseID: message?.releaseSourceID,
      releaseName: message?.releaseName,
      message: JSON.stringify(message)
    });
    Taro.navigateTo({ url: "/pages/publishEdit/index" + param });
  }, [message]);

  const handleDel = useCallback(async () => {
    const { confirm } = await Taro.showModal({
      title: "删除通知",
      content: "请确认是否要删除这条通知"
    });
    if (confirm) {
      const { code } = await delMsgByID(message?.messageID as string);
      if (code !== "0") {
        Taro.showToast({
          title: "删除失败",
          icon: "error",
          duration: DURATION
        });
        return;
      }
      Taro.showToast({
        title: "删除成功",
        icon: "success",
        duration: DURATION
      });
      setTimeout(() => {
        Taro.switchTab({ url: "/page/publish/index" });
      }, DURATION);
    }
  }, [message]);

  useEffect(() => {
    const { json } = getCurPageOptions() as { json: string };
    setMessage(JSON.parse(json));
  }, []);

  return (
    <View className="commonPageX">
      <View className="headerX">
        <View className="sourceInfoX">
          <View className="backbtnx">
            <BackRow />
          </View>
          <View>
            <text className="nameLabel">消息源</text>
            <text className="name">{message?.releaseName}</text>
          </View>
          <View>
            <text className="nameLabel">更新</text>
            <text className="name">{formatDate(new Date())}</text>
          </View>
        </View>
        <View className="msgDetailOptBtnX">
          {message?.type === "sub" ? (
            <>
              <View onClick={handleLike}>收藏</View>
              <View onClick={handleFixTop}>置顶</View>
            </>
          ) : (
            <>
              <View onClick={handleEdit}>编辑</View>
              <View onClick={handleDel}>删除</View>
            </>
          )}
        </View>
      </View>
      <View className="mainX">
        <View className="mTitle">
          <text>{message?.msgTitle}</text>
        </View>
        <View className="mCard">
          <View className="mcTitle">
            <text>{message?.subTitle}</text>
          </View>
          <View className="mcContent">
            <text>{message?.msgDetail}</text>
          </View>
        </View>
        <View>
          <View className="timeLine">
            <View className="tlTitle">
              <text>联系方式</text>
            </View>
            <View className="tlContent">{message?.connect}</View>
          </View>
          <View className="timeLine">
            <View className="tlTitle">
              <text>活动时间</text>
            </View>
            <View className="tlContent">
              {(message?.startTime ?? "") +
                (message?.endTime ? `至 ${message?.endTime}` : "")}
            </View>
          </View>
          <View className="timeLine">
            <View className="tlTitle">
              <text>备注</text>
            </View>
            <View className="tlContent">{message?.tips}</View>
          </View>
          <View className="timeLine">
            <View className="tlTitle">
              <text>图片</text>
            </View>
            <View className="tlImages">
              {message?.imgPathList?.map(url => (
                <View>
                  <Image src={getHttpImage(url)} />
                </View>
              ))}
            </View>
          </View>
          <View className="timeLine lastTimeLine">
            <View className="tlTitle">
              <text>关联地址</text>
            </View>
            <View className="tlContent tlItem">
              <View className="itemLabel">
                <text>地址名称</text>
              </View>
              <View className="itemValue">
                <text>{message?.location?.title}</text>
              </View>
            </View>
            <View className="tlContent tlItem">
              <View className="itemLabel">
                <text>详细地址</text>
              </View>
              <View className="itemValue">
                <text>{message?.location?.address}</text>
              </View>
            </View>
            <View className="tlMap">
              <Map
                latitude={Number(message?.location?.lat)}
                longitude={Number(message?.location?.lng)}
                markers={[
                  {
                    iconPath,
                    latitude: Number(message?.location?.lat),
                    longitude: Number(message?.location?.lng),
                    width: 32,
                    height: 32
                  }
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageDetail;
