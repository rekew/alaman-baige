import { api } from "@/app/api";
import type {
  ReplaceUserProfileRequest,
  UpdateUserProfileRequest,
} from "@/entities/profile";
import type { AuthUser } from "@/entities/auth";

export const getCurrentUser = async () => {
  const response = await api.get<AuthUser>("/users/me");

  return response.data;
};

export const replaceCurrentUser = async (payload: ReplaceUserProfileRequest) => {
  await api.put("/users/me", payload);
};

export const updateCurrentUser = async (payload: UpdateUserProfileRequest) => {
  await api.patch("/users/me", payload);
};

export const deleteCurrentUser = async () => {
  await api.delete("/users/me");
};
