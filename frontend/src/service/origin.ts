import Taro from "@tarojs/taro";
import { BASE_URL, getRequest } from "./httpService";
import { ReleaseType, ResponseEntity } from "./type";

const SECTION_URL = "/origin";

export const postToCreateReleaseSource = async (uploadImagePath: string, sourceName: string, sourceInfo: string, isPublish: string, rootID: string) => {
  const result = await Taro.uploadFile({
    url: `${BASE_URL}${SECTION_URL}/createReleaseSource`,
    filePath: uploadImagePath,
    header: {
      "response-type": "application/json"
    },
    name: "sourceCover",
    formData: {
      sourceInfo,
      sourceName,
      isPublish,
      rootID
    }
  });
  return (result as any).data as string;
};

export const getReleaseWithKeyword = async (keyword: string) => {
  return getRequest(`${SECTION_URL}/seachReleaseByKeyword`, { keyword }) as unknown as ResponseEntity<ReleaseType[]>;
};

export const searchUserSubReleaseSource = async (userID: string) => {
  return getRequest(`${SECTION_URL}/searchUserSubReleaseSource`, { userID }) as unknown as ResponseEntity<ReleaseType[]>;
};

export const searchUserOwnReleaseSource = async (userID: string) => {
  return getRequest(`${SECTION_URL}/searchUserOwnReleaseSource`, { userID }) as unknown as ResponseEntity<ReleaseType[]>;
};

export const getReleaseCover = async (releaseID: string) => {
  return getRequest(`${SECTION_URL}/getCover`, { releaseID }) as unknown as string;
};
