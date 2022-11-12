import { getRequest } from "./httpService";
import { GetUserIDByCodeData, ResponseEntity } from "./type";

const SECTION_URL = "/user";

export const getUserIDByCode = async (code?: string, userName?: string) => {
  return getRequest(`${SECTION_URL}/login`, { code, userName }) as unknown as ResponseEntity<GetUserIDByCodeData>;
};

export const subRelease = async (userID: string, releaseID: string) => {
  return getRequest(`${SECTION_URL}/userSubReleaseSource`, { userID, releaseID }) as unknown as ResponseEntity<GetUserIDByCodeData>;
};