export type ResponseEntity<T> = {
  code: string,
  msg: string,
  data: T;
};

export interface GetUserIDByCodeData {
  Email: string;
  OwnReleaseMessageIDs: string[];
  SubscribedSourcesIDs: string[];
  UserID: string;
  UserName: string;
}

export interface ReleaseType {
  IsReleaseSourcePublished: boolean;
  ReleaseMessageIDs: any[];
  ReleaseSourceCoverUrl: string;
  ReleaseSourceID: string;
  ReleaseSourceInfo: string;
  ReleaseSourceName: string;
  RootIDs: string[];
  UpdateTime: string;
}

export interface LocationType {
  adcode: number;
  address: string;
  category: string;
  city: string;
  id: string;
  location: Location;
  province: string;
  title: string;
  type: number;
  _distance: number;
}

interface Location {
  lat: number;
  lng: number;
}

export interface Message {
  messageID: string;
  connect: string;
  endTime: string;
  imgPathList: string[];
  location: MessageLocation;
  msgDetail: string;
  msgTitle: string;
  releaseSourceID: string;
  startTime: string;
  subTitle: string;
  tips: string;
}

interface MessageLocation {
  id: string;
  title: string;
  address: string;
  lat: string;
  lng: string;
}