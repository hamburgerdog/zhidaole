import { useState } from "react";

export const useTips = () => {
  const [tipList] = useState([
    {
      label: "订阅消息",
      key: "1"
    },
    {
      label: "及时更新",
      key: "2"
    },
    {
      label: "实时通知",
      key: "3"
    }
  ]);
  const [selectKey, setSelectKey] = useState("1");

  return { tipList, selectKey, setSelectKey };
};
