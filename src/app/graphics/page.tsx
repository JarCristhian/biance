"use client";
import { useSession } from "next-auth/react";
import { GraphService } from "./services/api";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import { redirect } from "next/navigation";
import { LayoutDashboard, Calendar, Tag, CreditCard, Users as UsersIcon } from "lucide-react";

import { SummaryCharts } from "./components/SummaryCharts";
import { DailyEvolutionCharts } from "./components/DailyEvolutionCharts";
import { CategoryCharts } from "./components/CategoryCharts";
import { PaymentMethodCharts } from "./components/PaymentMethodCharts";
import { UserKPICharts } from "./components/UserKPICharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/me/select";

const tabs = [
  { id: "summary", label: "Resumen", icon: LayoutDashboard },
  { id: "daily", label: "Evolución", icon: Calendar },
  { id: "categories", label: "Categorías", icon: Tag },
  { id: "payment", label: "Pagos", icon: CreditCard },
  { id: "users", label: "Usuarios & KPI", icon: UsersIcon },
];

export default function GraphicsPage() {
  const { data: session, status } = useSession();
  const graphService = useMemo(() => new GraphService(), []);

  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<any>({});

  const fetchData = useCallback(async () => {
    if (!session?.user?.token) return;
    try {
      setLoading(true);
      const token = session.user.token;

      const [
        incomeVsExpense, monthlyBalance, dailyExpenses, dailyIncome,
        yearly, expensesCat, incomeCat, topCat, distCat, trendCat,
        expensesPM, incomePM, usagePM, trendPM,
        userExp, userInc, userBal, ratio, avgExp, growth, glowingData
      ] = await Promise.all([
        graphService.getIncomeVsExpenseByMonth(token),
        graphService.getMonthlyBalance(token),
        graphService.getDailyExpenses(token),
        graphService.getDailyIncome(token),
        graphService.getYearlyComparison(token),
        graphService.getExpensesByCategory(token),
        graphService.getIncomeByCategory(token),
        graphService.getTopCategoriesByExpense(token),
        graphService.getExpenseDistributionByCategory(token),
        graphService.getExpenseTrendByCategory(token),
        graphService.getExpensesByPaymentMethod(token),
        graphService.getIncomeByPaymentMethod(token),
        graphService.getPaymentMethodUsage(token),
        graphService.getPaymentMethodTrend(token),
        graphService.getTotalExpenses(token),
        graphService.getTotalIncome(token),
        graphService.getUserBalance(token),
        graphService.getIncomeExpenseRatio(token),
        graphService.getAverageExpense(token),
        graphService.getCategoryGrowth(token),
        graphService.getGlowingLineChart(token),
      ]);

      setData({
        incomeVsExpense, monthlyBalance, dailyExpenses, dailyIncome,
        yearly, expensesCat, incomeCat, topCat, distCat, trendCat,
        expensesPM, incomePM, usagePM, trendPM,
        userExp, userInc, userBal, ratio, avgExp, growth, glowingData
      });

    } catch (error) {
      console.error("Error fetching graphics data:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.token, graphService]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, fetchData]);

  if (status === "loading" || (loading && status === "authenticated")) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-zinc-100 dark:border-zinc-800" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-t-2 border-zinc-900 dark:border-zinc-100 animate-spin" />
        </div>
      </div>
    );
  }

  if (!session) return redirect("/login");

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 pt-16 pb-4">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Gráficos</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Visualiza tus finanzas</p>
            </div>

            <div className="relative">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full bg-zinc-100 dark:bg-zinc-800/50 border-none rounded-xl px-4 py-1 text-sm font-bold text-zinc-700 dark:text-zinc-200 focus:ring-2 focus:ring-zinc-500 transition-all">
                  <SelectValue placeholder="Seleccionar gráfico" />
                </SelectTrigger>
                <SelectContent className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-zinc-200 dark:border-zinc-800">
                  {tabs.map((tab) => (
                    <SelectItem key={tab.id} value={tab.id} className="font-medium cursor-pointer">
                      <div className="flex items-center gap-2 my-1.5 mx-1">
                        <tab.icon size={14} className="text-zinc-500" />
                        {tab.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:mt-0 overflow-y-auto h-[calc(100dvh-10rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "summary" && (
              <SummaryCharts
                incomeVsExpense={data.incomeVsExpense || []}
                balance={data.monthlyBalance || []}
                yearly={data.yearly || []}
                ratio={data.ratio || []}
                glowingData={data.glowingData || []}
              />
            )}

            {activeTab === "daily" && (
              <DailyEvolutionCharts
                expenses={data.dailyExpenses || []}
                income={data.dailyIncome || []}
              />
            )}

            {activeTab === "categories" && (
              <CategoryCharts
                expenses={data.expensesCat || []}
                income={data.incomeCat || []}
                topExpenses={data.topCat || []}
                distribution={data.distCat || []}
                trend={data.trendCat || []}
                growth={data.growth || []}
              />
            )}

            {activeTab === "payment" && (
              <PaymentMethodCharts
                expenses={data.expensesPM || []}
                income={data.incomePM || []}
                usage={data.usagePM || []}
                trend={data.trendPM || []}
              />
            )}

            {activeTab === "users" && (
              <UserKPICharts
                expenses={data.userExp || []}
                income={data.userInc || []}
                balance={data.userBal || []}
                avgExpense={data.avgExp || []}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
