import { BackRow } from "@/components/BackRow";
import CancelAntConfirmBtn from "@/components/CancelAndConfirmBtn";
import { getHttpImage, getLocation } from "@/service/httpService";
import {
  postToCreateMessage,
  postToUpdateMessage,
  uploadMsgImage
} from "@/service/message";
import { getReleaseCover } from "@/service/origin";
import { LocationType } from "@/service/type";
import { getCurPageOptions } from "@/utils/common";
import { DURATION } from "@/utils/config";
import { Image, Input, Textarea, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { AtCalendar, AtFloatLayout, AtRadio, AtSearchBar } from "taro-ui";
import { formatDate } from "../index/components/IndexCard";
import { IMessage } from "../subscribe/SubCard";
import "./index.less";

type LocationOptionType = {
  value: string;
  label: string;
  desc?: string;
  location: {
    lat: number;
    lng: number;
  };
};

const PublishEdit = () => {
  const [releaseSourceID, setReleaseSourceID] = useState("");
  const [releaseSourceName, setReleaseSourceName] = useState("");

  const [releaseSourceImg, setReleaseSourceImg] = useState("");

  useEffect(() => {
    (async () => {
      if (releaseSourceID.length === 0) {
        return;
      }
      const coverUrl = await getReleaseCover(releaseSourceID);
      setReleaseSourceImg(getHttpImage(coverUrl));
    })();
  }, [releaseSourceID]);

  const [messageID, setMessageID] = useState("");
  const [showTimerPop, setShowTimerPop] = useState(false);
  const [showMapPop, setShowMapPop] = useState(false);

  const [uploadImgPathList, setUploadImgPathList] = useState(["", "", ""]);

  const [searchLocationWord, setSearchLocationWord] = useState("");
  const [locationOptions, setLocationOptions] = useState<LocationOptionType[]>(
    []
  );

  const [form, setForm] = useState({
    msgTitle: "",
    msgDetail: "",
    subTitle: "",
    startTime: dayjs().format("YYYY-MM-DD"),
    endTime: "",
    location: {
      id: "",
      address: "",
      title: "",
      lat: "",
      lng: ""
    },
    imgPathList: [],
    tips: "",
    connect: ""
  });

  const setFormItem = useCallback(
    item => {
      setForm({ ...form, ...item });
    },
    [form]
  );

  const setFormLocation = useCallback(
    item => {
      setFormItem({ ...form, location: { ...item } });
    },
    [form]
  );

  const chooseImage = useCallback(
    async index => {
      const { tempFilePaths } = await Taro.chooseImage({
        count: 1,
        sizeType: ["compressed"]
      });
      const copyList = [...uploadImgPathList];
      copyList[index] = tempFilePaths[0];
      setUploadImgPathList(copyList);
    },
    [uploadImgPathList, form]
  );

  const handleMapSearch = useCallback(async () => {
    const locationList = await getLocation(searchLocationWord);
    if (locationList === undefined || locationList.length === 0) {
      setLocationOptions([]);
      return;
    }
    const mapLocationToOption = (
      location: LocationType
    ): LocationOptionType => {
      return {
        label: location.title,
        value: location.id,
        desc: location.address,
        location: location.location
      };
    };
    setLocationOptions(locationList.map(mapLocationToOption));
  }, [searchLocationWord]);

  const selectLocation = useCallback(
    (id: string) => {
      const selectedLocation = locationOptions.find(
        ({ value }) => value === id
      );
      if (selectedLocation !== undefined) {
        const {
          value,
          desc,
          label,
          location: { lat, lng }
        } = selectedLocation;
        setFormLocation({
          id: value,
          address: desc,
          title: label,
          lat: `${lat}`,
          lng: `${lng}`
        });
      }
    },
    [locationOptions]
  );

  const showWarning = useCallback((title: string, msg?: string) => {
    Taro.showToast({
      title: msg === undefined ? `${title}为空` : msg,
      icon: "error"
    });
    return false;
  }, []);

  const validationForm = useCallback(() => {
    const valLength = (value, title, length: number) => {
      if (value.length < length) {
        showWarning("", `${title}小于${length}个字`);
        return false;
      }
      return true;
    };
    if (!valLength(form.msgTitle, "标题", 4)) return false;
    if (!valLength(form.msgDetail, "内容", 15)) return false;
    if (form.connect.length === 0) {
      showWarning("联系方式");
      return false;
    }
    return true;
  }, [form]);

  const createRelease = useCallback(async () => {
    if (!validationForm()) return;
    Taro.showLoading({ title: "上传数据中" });
    try {
      const pathList = await Promise.all(
        uploadImgPathList
          .filter(path => path !== "")
          .map(async path => {
            const data = await uploadMsgImage(path);
            return data;
          })
      );
      await postToCreateMessage({
        ...form,
        imgPathList: pathList,
        releaseSourceID
      });
      Taro.hideLoading();
      Taro.showToast({
        title: "创建成功",
        icon: "success",
        duration: DURATION
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, DURATION);
    } catch (e) {
      Taro.hideLoading();
      Taro.showToast({
        title: "创建失败",
        icon: "error",
        duration: DURATION
      });
    }
  }, [uploadImgPathList, messageID, form]);

  const updateRelease = useCallback(async () => {
    if (!validationForm()) return;
    Taro.showLoading({ title: "上传数据中" });
    try {
      const filterList = uploadImgPathList.filter(
        path => path !== "" && !path.startsWith("static")
      );
      let pathList: string[] = [];
      if (filterList.length !== 0) {
        pathList = await Promise.all(
          filterList.map(async path => {
            const data = await uploadMsgImage(path);
            return data;
          })
        );
      }
      await postToUpdateMessage(
        {
          ...form,
          imgPathList: [...uploadImgPathList, ...pathList],
          releaseSourceID
        },
        messageID
      );
      Taro.hideLoading();
      Taro.showToast({
        title: "更新成功",
        icon: "success",
        duration: DURATION
      });
      setTimeout(() => {
        Taro.switchTab({ url: "/pages/publish/index" });
      }, DURATION);
    } catch (e) {
      console.log(e);
      Taro.hideLoading();
      Taro.showToast({
        title: "更新失败",
        icon: "error",
        duration: DURATION
      });
    }
  }, [uploadImgPathList, messageID, form]);

  const handleCancel = useCallback(async () => {
    const { confirm } = await Taro.showModal({
      title: "取消发布",
      content: "请确认是否取消并返回上一层？"
    });
    if (confirm) {
      Taro.navigateBack();
      return;
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    const { confirm } = await Taro.showModal({
      title: "发布通知",
      content: "请您确认是否要发布该通知"
    });
    if (confirm) {
      if (messageID.length === 0) {
        createRelease();
      } else {
        updateRelease();
      }
      return;
    }
  }, [createRelease]);

  useEffect(() => {
    const {
      releaseName = "",
      releaseID = "",
      message = ""
    } = getCurPageOptions() as {
      releaseName: string;
      releaseID?: string;
      message?: string;
    };
    if (message.length !== 0) {
      const msgFromJson = JSON.parse(message) as IMessage;
      setMessageID(msgFromJson.messageID);
      setFormItem(msgFromJson);
    }
    setReleaseSourceID(releaseID);
    setReleaseSourceName(releaseName);
  }, []);

  useEffect(() => {
    const pathList = _.cloneDeep(uploadImgPathList);
    form.imgPathList.forEach((path, index) => {
      pathList[index] = path;
    });
    setUploadImgPathList(pathList);
  }, [form.imgPathList]);

  return (
    <View className="commonPageX">
      <View className="headerX">
        <View className="backBtn">
          <BackRow />
        </View>
        <View className="source">
          <View className="sourcePic">
            <Image src={releaseSourceImg} />
          </View>
          <View className="sourceName">
            <text>{releaseSourceName}</text>
          </View>
        </View>
      </View>
      <View className="mainX">
        <View className="msgTitle">
          <View>
            <input
              type="text"
              placeholder="消息标题"
              value={form.msgTitle}
              onInput={({ detail: { value } }: any) =>
                setFormItem({ msgTitle: value })
              }
            />
          </View>
          <View className="msgDate">
            <text className="dateLabel">发布时间</text>
            <text>{formatDate(new Date())}</text>
          </View>
        </View>
        <View className="msgCard">
          <View className="cardTitle">
            <text>消息正文</text>
          </View>
          <View className="cardContent">
            <Textarea
              maxlength={380}
              value={form.msgDetail}
              style={{ width: 280 }}
              onInput={({ detail: { value } }: any) => {
                setFormItem({ msgDetail: value });
              }}
            />
          </View>
        </View>
        <View className="otherList">
          <View className="otherLabel">
            <text>副标题</text>
          </View>
          <Input
            value={form.subTitle}
            onInput={({ detail: { value } }: any) =>
              setFormItem({ subTitle: value })
            }
            className="otherInput"
          />
          <View className="otherLabel">
            <text>时间选择</text>
          </View>
          <View className="otherText timeLine">
            <text
              onClick={() => {
                setShowTimerPop(true);
              }}
            >
              {`${form.startTime} 至 ${form.endTime ?? "?"}`}
            </text>
            <AtFloatLayout
              isOpened={showTimerPop}
              title="请选择一个时间范围"
              onClose={() => setShowTimerPop(false)}
            >
              <AtCalendar
                isMultiSelect
                minDate={dayjs().subtract(1, "day")}
                maxDate={dayjs().add(3, "month")}
                onSelectDate={({
                  value: { start: startTime, end: endTime }
                }: any) => {
                  setFormItem({ startTime, endTime });
                }}
              />
            </AtFloatLayout>
          </View>
          <View className="otherLabel">
            <text>地址信息</text>
          </View>
          <View className="otherText timeLine">
            <text onClick={() => setShowMapPop(true)}>
              {form.location.title.length === 0
                ? "当前暂无地址信息"
                : form.location.title}
            </text>
            <AtFloatLayout
              isOpened={showMapPop}
              title="请选择于该通知相关联的地址信息"
              onClose={() => setShowMapPop(false)}
            >
              <View className="mapBox">
                <View className="mapSearch">
                  <AtSearchBar
                    value={searchLocationWord}
                    onChange={setSearchLocationWord}
                    placeholder="请输入你要搜索的地址"
                    onActionClick={handleMapSearch}
                    onConfirm={handleMapSearch}
                  />
                </View>
                <View className="mapOptions">
                  <AtRadio
                    value={form.location.id}
                    options={locationOptions}
                    onClick={value => selectLocation(value)}
                  />
                </View>
              </View>
            </AtFloatLayout>
          </View>
          <View className="otherLabel">
            <text>图片</text>
          </View>
          <View className="otherImageX timeLine">
            {uploadImgPathList.map((imagePath, index) => (
              <View className="otherImage" onClick={() => chooseImage(index)}>
                <Image src={getHttpImage(imagePath)} />
              </View>
            ))}
          </View>
          <View className="otherLabel">
            <text>备注</text>
          </View>
          <Input
            value={form.tips}
            onInput={({ detail: { value } }: any) =>
              setFormItem({ tips: value })
            }
            className="otherInput"
          />
          <View className="otherLabel">
            <text>联系方式</text>
          </View>
          <Input
            value={form.connect}
            onInput={({ detail: { value } }: any) =>
              setFormItem({ connect: value })
            }
            className="otherInput"
          />
        </View>
        <CancelAntConfirmBtn
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      </View>
    </View>
  );
};

export default PublishEdit;
