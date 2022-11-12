interface User {
  userID: string | null;
  nickName: string | null;
  email: string | null;
  avatarUrl: string | null;
  ownReleaseMessageIDList: string[];
  subscribedSourcesIDList: string[];
}