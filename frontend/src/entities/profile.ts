export interface UserProfile {
  id: number;
  firstName: string;
  surname: string;
  phoneNumber: string;
  role: string;
}

export interface ReplaceUserProfileRequest {
  firstName: string;
  surname: string;
  phoneNumber: string;
}

export type UpdateUserProfileRequest = Partial<ReplaceUserProfileRequest>;
