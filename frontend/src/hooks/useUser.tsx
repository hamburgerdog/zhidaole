import { userState } from "@/atom/user";
import { getUserIDByCode } from "@/service/user";
import Taro from "@tarojs/taro";
import { useRecoilState } from "recoil";
import { useLogin, useUserInfo } from "taro-hooks";

export const useUser = () => {
  const [user, setUser] = useRecoilState<User>(userState as any);
  const [login] = useLogin();
  const [, { getUserProfile }] = useUserInfo();

  const updateUser = (item: Partial<User>) => {
    setUser({ ...user, ...item });
  };

  const userLogin = async () => {
    try {
      const userInfoFromResult = await getUserProfile({
        desc: "申请获取你的头像和姓名"
      });
      Taro.showLoading({ title: "登录中" });
      const code = await login();
      const { data } = await getUserIDByCode(
        code,
        (userInfoFromResult as any).nickName
      );
      const {
        UserID,
        UserName,
        Email,
        OwnReleaseMessageIDs,
        SubscribedSourcesIDs
      } = data;
      setUser({
        userID: UserID,
        nickName: UserName,
        email: Email,
        ownReleaseMessageIDList: OwnReleaseMessageIDs,
        subscribedSourcesIDList: SubscribedSourcesIDs,
        avatarUrl: (userInfoFromResult as any).avatarUrl
      });
      Taro.hideLoading();
      Taro.showToast({
        title: "登录成功",
        icon: "success"
      });
      return user;
    } catch (e) {
      Taro.hideLoading();
      console.error(e);
      Taro.showToast({
        title: "登录失败",
        icon: "error"
      });
    }
  };

  const userExit = () => {
    setUser({
      userID: null,
      nickName: null,
      avatarUrl: null,
      email: null,
      ownReleaseMessageIDList: [],
      subscribedSourcesIDList: []
    });
  };

  return [user, { userLogin, userExit, updateUser }];
};
