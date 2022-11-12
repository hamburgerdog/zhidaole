//  消息
interface Message {
  messageID: string;
  title: string;
  content: string;
  createTime: Date;
  updateTime: Date;

  sourceID: string; //  外键
}

//  用户
interface User {
  userID: string;
  userName: string;
  password: string;
  email: string;

  subscribedSourcesIDs: ReleaseSource['sourceID'][];
  ownReleaseMessageIDs: ReleaseSource['sourceID'][];
}

//  用户优先级
interface UserPriority {
  userID: User['userID'],
  lowSourceIDs: ReleaseSource['sourceID'][],
  midSourceIDs: ReleaseSource['sourceID'][],
  highSourceIDs: ReleaseSource['sourceID'][],
  lowMessageIDs: Message['messageID'][],
  midMessageIDs: Message['messageID'][],
  highMessageIDs: Message['messageID'][],
}

//  消息源
interface ReleaseSource {
  sourceID: string;
  releaseMessageIDs: Message['messageID'][];

  updateTime: Date;
  rootIDs: User['userID'][],
}

