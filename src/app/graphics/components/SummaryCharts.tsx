"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Scale } from "lucide-react"
import { incomeVsExpenseByMonth, monthlyBalance, yearlyComparison, incomeExpenseRatio } from "../interfaces"

interface SummaryChartsProps {
    incomeVsExpense: incomeVsExpenseByMonth[]
    balance: monthlyBalance[]
    yearly: yearlyComparison[]
    ratio: incomeExpenseRatio[]
}

export function SummaryCharts({ incomeVsExpense, balance, yearly, ratio }: SummaryChartsProps) {
    const incomeVsExpenseConfig = {
        income: {
            label: "Ingresos",
            color: "#10b981", // Emerald-500 for income
        },
        expense: {
            label: "Gastos",
            color: "#ef4444", // Rose-500 for expense
        },
    } satisfies ChartConfig

    const balanceConfig = {
        balance: {
            label: "Balance",
            color: "#71717a", // Zinc-500
        },
    } satisfies ChartConfig

    const yearlyConfig = {
        balance: {
            label: "Balance Anual",
            color: "#3f3f46", // Zinc-600
        },
    } satisfies ChartConfig

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {/* 1. Ingresos vs Gastos por mes */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Comparativa Mensual</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Ingresos vs Gastos</CardDescription>
                        </div>
                        <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                            <TrendingUp size={18} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={incomeVsExpenseConfig} className="h-[250px] w-full">
                        <BarChart data={incomeVsExpense} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: 'currentColor', fontSize: 11 }}
                                className="text-zinc-500 dark:text-zinc-400 font-medium"
                                tickFormatter={(value) => {
                                    if (typeof value !== 'string') return value;
                                    // Try to handle YYYY-MM format
                                    const parts = value.split('-');
                                    if (parts.length >= 2) {
                                        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                                        const monthIdx = parseInt(parts[1]) - 1;
                                        return months[monthIdx] || value;
                                    }
                                    return value;
                                }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: 'currentColor', fontSize: 11 }}
                                className="text-zinc-500 dark:text-zinc-400 font-medium"
                                tickFormatter={(value) => `$${value}`}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar
                                dataKey="income"
                                fill="var(--color-income)"
                                radius={[4, 4, 0, 0]}
                                barSize={20}
                                animationDuration={1500}
                            />
                            <Bar
                                dataKey="expense"
                                fill="var(--color-expense)"
                                radius={[4, 4, 0, 0]}
                                barSize={20}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 2. Balance mensual */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Balance Neto</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Evolución de ahorros</CardDescription>
                        </div>
                        <div className="p-2 bg-zinc-500/10 rounded-xl text-zinc-500">
                            <Scale size={18} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={balanceConfig} className="h-[250px] w-full">
                        <AreaChart data={balance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-balance)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--color-balance)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: 'currentColor', fontSize: 11 }}
                                className="text-zinc-500 dark:text-zinc-400 font-medium"
                                tickFormatter={(value) => {
                                    if (typeof value !== 'string') return value;
                                    // Try to handle YYYY-MM format
                                    const parts = value.split('-');
                                    if (parts.length >= 2) {
                                        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                                        const monthIdx = parseInt(parts[1]) - 1;
                                        return months[monthIdx] || value;
                                    }
                                    return value;
                                }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: 'currentColor', fontSize: 11 }}
                                className="text-zinc-500 dark:text-zinc-400 font-medium"
                                tickFormatter={(value) => `$${value}`}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                                type="monotone"
                                dataKey="balance"
                                stroke="var(--color-balance)"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorBalance)"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 5. Comparación interanual */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Visión Anual</CardTitle>
                    <CardDescription className="text-zinc-500 dark:text-zinc-400">Balance consolidado</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={yearlyConfig} className="h-[250px] w-full">
                        <BarChart data={yearly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="year"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: 'currentColor', fontSize: 11 }}
                                className="text-zinc-500 dark:text-zinc-400 font-medium"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: 'currentColor', fontSize: 11 }}
                                className="text-zinc-500 dark:text-zinc-400 font-medium"
                                tickFormatter={(value) => `$${value}`}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="balance"
                                fill="var(--color-balance)"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 18. Ratio ingresos vs gastos */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col justify-center">
                <CardHeader className="pb-2 text-center">
                    <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Ratio de Salud</CardTitle>
                    <CardDescription className="text-zinc-500 dark:text-zinc-400">Eficiencia de gasto</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-4">
                    <div className="relative flex items-center justify-center">
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="10"
                                fill="transparent"
                                className="text-zinc-100 dark:text-zinc-800"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="10"
                                fill="transparent"
                                strokeDasharray={439.6}
                                strokeDashoffset={439.6 - (Math.min(ratio[0]?.ratio || 0, 2) / 2) * 439.6}
                                className={(ratio[0]?.ratio || 0) >= 1 ? "text-emerald-500" : "text-rose-500"}
                                style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                {(ratio[0]?.ratio || 0).toFixed(2)}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ratio</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                        {(ratio[0]?.ratio || 0) >= 1 ? (
                            <span className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                                Superávit <TrendingUp size={14} />
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full">
                                Déficit <TrendingDown size={14} />
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
