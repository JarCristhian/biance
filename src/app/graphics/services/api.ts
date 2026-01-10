import api from "@/app/api/apiClient";
import {
  incomeVsExpenseByMonth, monthlyBalance, dailyExpenses, dailyIncome,
  yearlyComparison, expensesByCategory, incomeByCategory, topCategoriesByExpense,
  expenseDistributionByCategory, expenseTrendByCategory, expensesByPaymentMethod,
  incomeByPaymentMethod, paymentMethodUsage, paymentMethodTrend, totalExpenses,
  totalIncome, userBalance, incomeExpenseRatio, averageExpense,
  categoryGrowth, glowingLineChartData
} from "../interfaces";

const globalEndpoint = "graph/";

export class GraphService {
  async getIncomeVsExpenseByMonth(token?: string) {
    const result = await api.get(`${globalEndpoint}income-expense-month`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as incomeVsExpenseByMonth[];
  }

  async getMonthlyBalance(token?: string) {
    const result = await api.get(`${globalEndpoint}monthly-balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as monthlyBalance[];
  }

  async getDailyExpenses(token?: string) {
    const result = await api.get(`${globalEndpoint}daily-expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as dailyExpenses[];
  }

  async getDailyIncome(token?: string) {
    const result = await api.get(`${globalEndpoint}daily-income`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as dailyIncome[];
  }

  async getYearlyComparison(token?: string) {
    const result = await api.get(`${globalEndpoint}yearly-comparison`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as yearlyComparison[];
  }

  async getExpensesByCategory(token?: string) {
    const result = await api.get(`${globalEndpoint}expenses-by-category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as expensesByCategory[];
  }

  async getIncomeByCategory(token?: string) {
    const result = await api.get(`${globalEndpoint}income-by-category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as incomeByCategory[];
  }

  async getTopCategoriesByExpense(token?: string) {
    const result = await api.get(`${globalEndpoint}top-categories-by-expense`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as topCategoriesByExpense[];
  }

  async getExpenseDistributionByCategory(token?: string) {
    const result = await api.get(`${globalEndpoint}expense-distribution-by-category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as expenseDistributionByCategory[];
  }

  async getExpenseTrendByCategory(token?: string) {
    const result = await api.get(`${globalEndpoint}expense-trend-by-category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as expenseTrendByCategory[];
  }

  async getExpensesByPaymentMethod(token?: string) {
    const result = await api.get(`${globalEndpoint}expenses-by-payment-method`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as expensesByPaymentMethod[];
  }

  async getIncomeByPaymentMethod(token?: string) {
    const result = await api.get(`${globalEndpoint}income-by-payment-method`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as incomeByPaymentMethod[];
  }

  async getPaymentMethodUsage(token?: string) {
    const result = await api.get(`${globalEndpoint}payment-method-usage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as paymentMethodUsage[];
  }

  async getPaymentMethodTrend(token?: string) {
    const result = await api.get(`${globalEndpoint}payment-method-trend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as paymentMethodTrend[];
  }

  async getTotalExpenses(token?: string) {
    const result = await api.get(`${globalEndpoint}total-expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as totalExpenses[];
  }

  async getTotalIncome(token?: string) {
    const result = await api.get(`${globalEndpoint}total-income`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as totalIncome[];
  }

  async getUserBalance(token?: string) {
    const result = await api.get(`${globalEndpoint}user-balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as userBalance[];
  }

  async getIncomeExpenseRatio(token?: string) {
    const result = await api.get(`${globalEndpoint}income-expense-ratio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as incomeExpenseRatio[];
  }

  async getAverageExpense(token?: string) {
    const result = await api.get(`${globalEndpoint}average-expense`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as averageExpense[];
  }

  async getCategoryGrowth(token?: string) {
    const result = await api.get(`${globalEndpoint}category-growth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as categoryGrowth[];
  }

  async getGlowingLineChart(token?: string) {
    const result = await api.get(`${globalEndpoint}glowing-line-chart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data as glowingLineChartData[];
  }
}
