import api from "@/lib/api";
import { StoreCategory } from "../interfaces";

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
  async postCategory(data: StoreCategory, token?: string) {
    const result = await api.post("category", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);

    return result;
  }
  async updateCategory(id: number, data: StoreCategory, token?: string) {
    const result = await api.patch(`category/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }
}
