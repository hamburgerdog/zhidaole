import { userState } from "@/atom/user";
import { BackRow } from "@/components/BackRow";
import CancelAntConfirmBtn from "@/components/CancelAndConfirmBtn";
import { postToCreateReleaseSource } from "@/service/origin";
import { Image, Input, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import "./index.less";

const toastForCheckingNullError = (value: string | null, title: string) => {
  if (value === null) {
    Taro.showToast({
      title,
      icon: "error"
    });
    return true;
  }
  return false;
};

const NewPubSource = () => {
  const [user] = useRecoilState(userState);
  const [uploadImagePath, setUploadImagePath] = useState<string | null>(null);
  const [isPublish, setIsPublish] = useState<boolean>(true);
  const [sourceName, setSourceName] = useState<string | null>(null);
  const [sourceInfo, setSourceInfo] = useState<string | null>(null);

  const chooseImage = async () => {
    const { tempFilePaths } = await Taro.chooseImage({
      count: 1,
      sizeType: ["compressed"]
    });
    setUploadImagePath(tempFilePaths[0]);
  };

  const handleCancel = async () => {
    const { confirm } = await Taro.showModal({
      title: "取消新增发布源",
      content: "请问是否确认要取消发布？"
    });
    if (confirm) {
      Taro.navigateBack();
      return;
    }
  };

  const handleConfirm = async () => {
    if (
      toastForCheckingNullError(sourceName, "请输入源的名字") ||
      toastForCheckingNullError(sourceInfo, "请输入源的信息") ||
      toastForCheckingNullError(uploadImagePath, "请上传封面照片")
    ) {
      return;
    }
    const { confirm: confirmToCreateRelease } = await Taro.showModal({
      title: "新增发布源",
      content: "请是否确认创建该源？"
    });
    if (confirmToCreateRelease) {
      const result = await postToCreateReleaseSource(
        uploadImagePath as string,
        sourceName as string,
        sourceInfo as string,
        String(isPublish),
        (user.userID as unknown) as string
      );
      if (result.includes(`"msg":"OK"`)) {
        const { confirm: confirmToNavBack } = await Taro.showModal({
          title: "创建成功",
          content: "是否返回主界面？"
        });
        if (confirmToNavBack) {
          Taro.navigateBack();
        }
      } else {
        Taro.showToast({
          title: "创建失败",
          icon: "error"
        });
      }
    }
  };

  const handleInputChange = (
    value: string,
    changeState: (value: string) => void
  ) => {
    changeState(value);
  };

  return (
    <View className="commonPageX">
      <View className="headerX">
        <View className="backIconX">
          <BackRow handleClick={handleCancel} />
        </View>
        <View className="headerText">
          <text>新增发布源</text>
        </View>
      </View>
      <View className="mainX">
        <View className="timeLine">
          <View className="tlTitle">
            <text>请输入您要新建发布源的名字</text>
          </View>
          <View className="tlContent">
            <Input
              value={sourceName ?? ""}
              onInput={({ target }) => {
                handleInputChange(
                  ((target as unknown) as { value: string }).value,
                  setSourceName
                );
              }}
            />
          </View>
        </View>
        <View className="timeLine">
          <View className="tlTitle">
            <text>请用一段简介介绍发布源的信息</text>
          </View>
          <View className="tlContent">
            <Input
              value={sourceInfo ?? ""}
              onInput={({ target }) => {
                handleInputChange(
                  ((target as unknown) as { value: string }).value,
                  setSourceInfo
                );
              }}
            />
          </View>
        </View>
        <View className="timeLine">
          <View className="tlTitle">
            <text>上传发布源的封面</text>
          </View>
          <View className="tlImages">
            <View onClick={chooseImage}>
              <Image src={uploadImagePath ?? ""} />
            </View>
            <View className="round" onClick={chooseImage}>
              <Image src={uploadImagePath ?? ""} />
            </View>
          </View>
        </View>
        <View className="timeLine lastTimeLine">
          <View className="tlTitle">
            <text>请问发布源是否公开</text>
          </View>
          <View className="tlTextBtn">
            <text
              className={isPublish ? "" : "highLight"}
              onClick={() => setIsPublish(false)}
            >
              否
            </text>
            <text
              className={isPublish ? "highLight" : ""}
              onClick={() => setIsPublish(true)}
            >
              是
            </text>
          </View>
        </View>
        <CancelAntConfirmBtn
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      </View>
    </View>
  );
};

export default NewPubSource;
