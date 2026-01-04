import api from "@/app/api/apiClient";
import { StoreUser } from "../interfaces";

export interface Params {
  page?: number;
  perPage?: number;
  search?: string | null;
  date?: string | null;
}

export class UserService {
  async getUsers(token?: string) {
    const result = await api.get("users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }
  async postUser(data: StoreUser, token?: string) {
    const result = await api.post("users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);

    return result;
  }
  async updateUser(id: number, data: StoreUser, token?: string) {
    const result = await api.patch(`users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }
}
