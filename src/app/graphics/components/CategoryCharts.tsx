"use client"

import * as React from "react"
import { Pie, PieChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import { Tag, PieChart as PieIcon, BarChart3, TrendingUp } from "lucide-react"
import { expensesByCategory, incomeByCategory, topCategoriesByExpense, expenseDistributionByCategory, expenseTrendByCategory, categoryGrowth } from "../interfaces"

interface CategoryChartsProps {
    expenses: expensesByCategory[]
    income: incomeByCategory[]
    topExpenses: topCategoriesByExpense[]
    distribution: expenseDistributionByCategory[]
    trend: expenseTrendByCategory[]
    growth: categoryGrowth[]
}

const COLORS = [
    "#A7C7E7", // Pastel Blue
    "#C1E1C1", // Pastel Green
    "#FFD1DC", // Pastel Pink
    "#FFB7CE", // Cotton Candy
    "#E6E6FA", // Lavender
    "#FDFD96", // Pastel Yellow
    "#FFDAC1", // Pastel Orange
    "#B0E0E6", // Powder Blue
    "#B19CD9", // Light Pastel Purple
    "#C3B1E1", // Pastel Violet
]

export function CategoryCharts({
    expenses,
    income,
    topExpenses,
    distribution,
    trend,
    growth
}: CategoryChartsProps) {

    const chartConfig = {
        expense: {
            label: "Gasto",
            theme: {
                light: "#A7C7E7",
                dark: "#7FB3E0",
            }
        },
        income: {
            label: "Ingreso",
            theme: {
                light: "#C1E1C1",
                dark: "#93C47D",
            }
        },
        growth: {
            label: "Crecimiento",
            theme: {
                light: "#FFB7CE",
                dark: "#FF80A0",
            }
        },
        percentage: {
            label: "Porcentaje",
            theme: {
                light: "#FFDAC1",
                dark: "#E6A172",
            }
        },
        // Base colors for pie slices
        chart1: { theme: { light: "#A7C7E7", dark: "#7FB3E0" } },
        chart2: { theme: { light: "#C1E1C1", dark: "#93C47D" } },
        chart3: { theme: { light: "#FFD1DC", dark: "#FF99AF" } },
        chart4: { theme: { light: "#FFB7CE", dark: "#FF80A0" } },
        chart5: { theme: { light: "#E6E6FA", dark: "#B3B3F1" } },
    } satisfies ChartConfig

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Distribución</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Gasto total por categoría (%)</CardDescription>
                        </div>
                        <PieIcon className="text-orange-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <PieChart>
                            <Pie
                                data={distribution}
                                dataKey="percentage"
                                nameKey="categoryName"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                animationDuration={1500}
                            >
                                {distribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`var(--color-chart${(index % 5) + 1})`} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent nameKey="categoryName" />} />
                            <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Ingresos</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Fuentes principales</CardDescription>
                        </div>
                        <Tag className="text-emerald-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[150px] w-full">
                        <PieChart>
                            <Pie
                                data={income}
                                dataKey="income"
                                nameKey="categoryName"
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                animationDuration={1500}
                            >
                                {income.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`var(--color-chart${((index + 2) % 5) + 1})`} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent nameKey="categoryName" />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Top Gastos</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Ranking por categoría</CardDescription>
                        </div>
                        <BarChart3 className="text-indigo-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart
                            data={topExpenses}
                            layout="vertical"
                            margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
                        >
                            <CartesianGrid horizontal={false} className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="categoryName"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                fontSize={10}
                                width={80}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                            />
                            <ChartTooltip content={<ChartTooltipContent nameKey="categoryName" />} />
                            <Bar
                                dataKey="expense"
                                fill="var(--color-expense)"
                                radius={[0, 4, 4, 0]}
                                barSize={15}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Tendencia Alcista</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Crecimiento de gasto</CardDescription>
                        </div>
                        <TrendingUp className="text-rose-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart data={growth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="categoryName"
                                tickLine={false}
                                axisLine={false}
                                fontSize={10}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                fontSize={10}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                                tickFormatter={(val) => `${val}%`}
                            />
                            <ChartTooltip content={<ChartTooltipContent nameKey="categoryName" />} />
                            <Bar
                                dataKey="growth"
                                fill="var(--color-growth)"
                                radius={[4, 4, 0, 0]}
                                barSize={20}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 10. Tendencia de gastos por categoría */}
            <Card className="md:col-span-2 overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Historial de Categorías</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Evolución temporal por rubro</CardDescription>
                        </div>
                        <BarChart3 className="text-zinc-400" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <LineChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="categoryName"
                                tickLine={false}
                                axisLine={false}
                                fontSize={10}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                fontSize={10}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                                tickFormatter={(val) => `$${val}`}
                            />
                            <ChartTooltip content={<ChartTooltipContent nameKey="categoryName" />} />
                            <Line
                                type="monotone"
                                dataKey="expense"
                                stroke="var(--color-expense)"
                                strokeWidth={3}
                                dot={{ r: 4, strokeWidth: 0, fill: "var(--color-expense)" }}
                                animationDuration={2000}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
