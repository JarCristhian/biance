import api from "@/lib/api";
import { StoreFinance } from "../interfaces";

export interface Params {
  page?: number;
  perPage?: number;
  search?: string | null;
  date?: string | null;
  type: number;
}

export class FinanceService {
  async getFinances(params: Params, token?: string) {
    const data = await api.get("finance", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  async postFinances(data: StoreFinance, token?: string) {
    const result = await api.post("finance", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async updateFinances(id: number, data: StoreFinance, token?: string) {
    const result = await api.patch(`finance/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async getCategories(token?: string) {
    const result = await api.get("category/active", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async getTotals(token?: string, type?: number) {
    const result = await api.get(`finance/totals/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }
}
