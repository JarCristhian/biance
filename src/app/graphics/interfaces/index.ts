
export interface incomeVsExpenseByMonth {
  month: string;
  income: number;
  expense: number;
}

export interface monthlyBalance {
  month: string;
  balance: number;
}

export interface dailyExpenses {
  day: string;
  expense: number;
}

export interface dailyIncome {
  day: string;
  income: number;
}

export interface yearlyComparison {
  year: string;
  balance: number;
}


export interface expensesByCategory {
  categoryId: string;
  categoryName?: string;
  expense: number;
}

export interface incomeByCategory {
  categoryId: string;
  categoryName?: string;
  income: number;
}

export interface topCategoriesByExpense {
  categoryId: string;
  categoryName?: string;
  expense: number;
}

export interface expenseDistributionByCategory {
  categoryId: string;
  categoryName?: string;
  percentage: number;
}

export interface expenseTrendByCategory {
  categoryId: string;
  categoryName?: string;
  expense: number;
}

export interface expensesByPaymentMethod {
  paymentMethodId: string;
  paymentMethodName?: string;
  expense: number;
}

export interface incomeByPaymentMethod {
  paymentMethodId: string;
  paymentMethodName?: string;
  income: number;
}

export interface paymentMethodUsage {
  paymentMethodId: string;
  paymentMethodName?: string;
  usage: number;
}

export interface paymentMethodTrend {
  paymentMethodId: string;
  paymentMethodName?: string;
  usage: number;
}

export interface totalExpenses {
  expense: number;
}

export interface totalIncome {
  income: number;
}

export interface userBalance {
  balance: number;
}

export interface incomeExpenseRatio {
  ratio: number;
}

export interface averageExpense {
  expense: number;
}

export interface categoryGrowth {
  categoryId: string;
  categoryName?: string;
  growth: number;
}

export interface glowingLineChartData {
  month: string;
  income: number;
  expense: number;
}