import api from "@/app/api/apiClient";
import { StoreFinance } from "../interfaces";

export interface Params {
  page?: number;
  perPage?: number;
  search?: string | null;
  date?: string | null;
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

  async getCategories(token?: string) {
    const result = await api.get("category/active", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async getTotals(token?: string) {
    const result = await api.get("finance/totals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }
}
