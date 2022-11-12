import Taro from "@tarojs/taro";

export const getCurPageOptions = () => {
  const pages = Taro.getCurrentPages()
  const curPage = pages[pages.length - 1];
  return curPage.options
}
