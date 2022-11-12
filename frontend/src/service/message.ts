import { mapObjectToURLParams } from "@/utils/http";
import Taro from "@tarojs/taro";
import { BASE_URL, deleteRequest, getRequest } from "./httpService";
import { Message, ResponseEntity } from "./type";

const SECTION_URL = "/message";

export const postToCreateMessage = async (form: {
  releaseSourceID: string;
  msgTitle: string;
  msgDetail: string;
  subTitle: string;
  startTime: string;
  endTime: string;
  location: {
    id: string;
    address: string;
    title: string;
    lat: string;
    lng: string;
  };
  imgPathList: string[];
  tips: string;
  connect: string;
}) => {
  const result = await Taro.request({
    url: `${BASE_URL}${SECTION_URL}/create`,
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    data: { ...form },
  });
  return (result as any).data as string;
};

export const postToUpdateMessage = async (form: {
  releaseSourceID: string;
  msgTitle: string;
  msgDetail: string;
  subTitle: string;
  startTime: string;
  endTime: string;
  location: {
    id: string;
    address: string;
    title: string;
    lat: string;
    lng: string;
  };
  imgPathList: string[];
  tips: string;
  connect: string;
}, messageID: string) => {
  const result = await Taro.request({
    url: `${BASE_URL}${SECTION_URL}/update`,
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    data: { ...form, messageID },
  });
  return (result as any).data as string;
};

export const uploadMsgImage = async (uploadImagePath: string) => {
  const { data } = await Taro.uploadFile({
    url: `${BASE_URL}${SECTION_URL}/uploadImage`,
    filePath: uploadImagePath,
    header: {
      "response-type": "application/json"
    },
    name: "msgImage"
  }) as unknown as { data: string; };

  return data.substring(1, data.length - 1);
};

export const getMessageList = async (releaseID: string) => {
  const result = await getRequest(`${SECTION_URL}/searchReleaseMsg`, { releaseID });
  return result as unknown as ResponseEntity<Message[]>;
};

export const getMsgListByKeywordAndReleaseID = async (releaseID: string, keyword: string) => {
  const result = await getRequest(`${SECTION_URL}/searchByKeywordAndID`, { releaseID, keyword });
  return result as unknown as ResponseEntity<Message[]>;
};

export const delMsgByID = async (messageID: string) => {
  const result = await deleteRequest(`${SECTION_URL}/deleteByID`, { messageID });
  return result as unknown as ResponseEntity<null>;;
};
