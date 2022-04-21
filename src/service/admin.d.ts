declare function getMessage(): {
  messageID: string;
  connect: string;
  endTime: string;
  imgPathList: string[];
  location: { id: string, title: string, address: string, lat: string, lng: string; };
  msgDetail: string;
  msgTitle: string;
  releaseSourceID: string;
  startTime: string;
  subTitle: string;
  tips: string;
};

declare function getRelease(): {
  IsReleaseSourcePublished: boolean;
  ReleaseMessageIDs: string[];
  ReleaseSourceCoverUrl: string;
  ReleaseSourceID: string;
  ReleaseSourceInfo: string;
  ReleaseSourceName: string;
  RootIDs: string[];
  UpdateTime: string;
};

declare function getUser(): {
  messageID: string;
  connect: string;
  endTime: string;
  imgPathList: string[];
  location: { id: string, title: string, address: string, lat: string, lng: string; };
  msgDetail: string;
  msgTitle: string;
  releaseSourceID: string;
  startTime: string;
  subTitle: string;
  tips: string;
};