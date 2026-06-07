export interface UserProfile {
  id: number;
  firstName: string;
  surname: string;
  phoneNumber: string;
}

export interface ReplaceUserProfileRequest {
  firstName: string;
  surname: string;
  phoneNumber: string;
}

export type UpdateUserProfileRequest = Partial<ReplaceUserProfileRequest>;
