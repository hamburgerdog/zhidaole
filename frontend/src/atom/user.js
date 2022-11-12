const {
  atom
} = require("recoil");

export const userState = atom({
  key: "user",
  default: {
    userID: null,
    nickName: null,
    avatarUrl: null,
    email: null,
    ownReleaseMessageIDList: [],
    subscribedSourcesIDList: [],
  }
})
