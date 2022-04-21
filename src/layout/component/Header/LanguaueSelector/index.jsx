import { EnvironmentOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { memo } from 'react';

import i18n from '@/locales/config';

import styles from './index.module.less';

const { Option } = Select;

const selectorConfigList = [
  {
    label: '简体中文',
    value: 'cn',
  },
  // {
  //   label: 'English',
  //   value: 'en',
  // },
  // {
  //   label: '繁体中文',
  //   value: 'hk',
  // },
];
/**
 * 语言选择器
 */
const LanguaueSelector = memo(() => (
  <div className={styles.headerLanguaueBox}>
    <EnvironmentOutlined />
    <Select
      defaultValue={i18n.language}
      bordered={false}
      className={styles.selectBox}
      showArrow={false}
      onSelect={value => {
        i18n.changeLanguage(value);
      }}
    >
      {selectorConfigList.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  </div>
));

export default LanguaueSelector;
