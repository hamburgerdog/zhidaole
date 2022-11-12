import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  initReactI18next,
} from "react-i18next";

import en from './en-us.json'
import cn from './zh-cn.json'
import hk from './zh-hk.json'

const resources = {
  cn: {
    translation: cn,
  },
  hk: {
    translation: hk,
  },
  en: {
    translation: en,
  },
};
i18n.use(LanguageDetector) //嗅探当前浏览器语言 zh-CN
  .use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({ //初始化
    resources, //本地多语言数据
    fallbackLng: "cn", //默认当前环境的语言
    detection: {
      caches: ['localStorage', 'sessionStorage'],
    },
  })

export default i18n