import api from "@/lib/api";

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
}

export class TaskService {
  async getTasks(params?: Params, token?: string) {
    const result = await api.get("task", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async postTask(data: any, token?: string) {
    const result = await api.post("task", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async updateTask(id: number, data: any, token?: string) {
    const result = await api.patch(`task/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  //notifications
  async getNotifications(token: string) {
    const result = await api.get("notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async getUnreadNotifications(token: string) {
    const result = await api.get("notifications/unread", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async markAsRead(id: number, token: string) {
    const result = await api.patch(`notifications/${id}/read`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }

  async markAllAsRead(token: string) {
    const result = await api.patch("notifications/read-all", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  }
}
