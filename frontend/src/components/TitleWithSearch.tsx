import { View } from "@tarojs/components";
import React, { useState } from "react";
import { AtSearchBar } from "taro-ui";

export const TitleWithSearch = ({
  title,
  handleSearch
}: {
  title: string;
  handleSearch?: (keyword: string) => void;
}) => {
  const [keyword, setKeyword] = useState<string>("");

  return (
    <View
      className="titleX"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        className="title"
        style={{
          color: "#234D74",
          fontWeight: "500",
          fontSize: "36px",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "8px"
        }}
      >
        <text>{title}</text>
      </View>
      <View style={{ width: "100%" }}>
        <AtSearchBar
          value={keyword}
          onChange={value => {
            setKeyword(value);
          }}
          onClear={() => {
            setKeyword("");
            handleSearch && handleSearch("");
          }}
          onConfirm={() => {
            handleSearch && handleSearch(keyword);
          }}
          onActionClick={() => {
            handleSearch && handleSearch(keyword);
          }}
        />
      </View>
    </View>
  );
};
