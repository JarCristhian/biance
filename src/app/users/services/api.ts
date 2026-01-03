import api from "@/app/api/apiClient";
import { StoreUser } from "../interfaces";

export interface Params {
  page?: number;
  perPage?: number;
  search?: string | null;
  date?: string | null;
}

export class CategoryService {
  async getCategories(token?: string) {
    const result = await api.get("category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }
  async postCategory(data: StoreUser, token?: string) {
    const result = await api.post("category", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);

    return result;
  }
  async updateCategory(id: number, data: StoreUser, token?: string) {
    const result = await api.patch(`category/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }
}
