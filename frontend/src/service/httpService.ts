import { MapKey } from "@/utils/config";
import Taro from "@tarojs/taro";
import { LocationType } from "./type";

// export const BASE_URL = "http://172.20.10.9";
export const BASE_URL = "http://localhost";

export const getHttpImage = (imageUrl: string) => `${BASE_URL}/${imageUrl}`;

export const getRequest = async (apiUrl: string, data: any) => {
  try {
    const { data: result } = await Taro.request({
      url: `${BASE_URL}${apiUrl}`,
      data,
      method: "GET"
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const deleteRequest = async (apiUrl: string, data: any) => {
  try {
    const { data: result } = await Taro.request({
      url: `${BASE_URL}${apiUrl}`,
      data,
      method: "DELETE"
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getLocation = async (keyword: string) => {
  const locationConfig = {
    region: '广州',
    region_fix: 1,
    location: "23.03989,113.37322",
    key: MapKey,
  };

  try {
    const { data: { data: result } } = await Taro.request({
      url: "https://apis.map.qq.com/ws/place/v1/suggestion",
      data: { keyword, ...locationConfig }
    });
    return result as LocationType[];
  } catch (e) {
    console.error(e);
  }
};