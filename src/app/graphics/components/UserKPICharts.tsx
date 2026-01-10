"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
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
} from "@/components/ui/chart"
import { Target, TrendingDown, Percent, Users as UsersIcon } from "lucide-react"
import { totalExpenses, totalIncome, userBalance, averageExpense } from "../interfaces"

interface UserKPIChartsProps {
    expenses: totalExpenses[]
    income: totalIncome[]
    balance: userBalance[]
    avgExpense: averageExpense[]
}

export function UserKPICharts({ expenses, income, balance, avgExpense }: UserKPIChartsProps) {
    const chartConfig = {
        value: {
            label: "Valor",
            color: "#71717a",
        },
    } satisfies ChartConfig

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            <Card className="md:col-span-2 overflow-hidden border-none shadow-md bg-zinc-950 text-white relative group">
                <div className="absolute inset-0 bg-linear-to-tr from-[#A7C7E7]/10 via-transparent to-[#C1E1C1]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <CardContent className="p-10 flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-white/10 rounded-2xl mb-6">
                        <Percent className="text-zinc-300" size={32} />
                    </div>
                    <p className="text-zinc-400 font-black uppercase tracking-widest text-xs mb-2">Promedio por Transacción</p>
                    <h3 className="text-6xl font-black tracking-tighter mb-2">
                        ${(avgExpense[0]?.expense || 0).toLocaleString()}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                        <TrendingDown size={16} className="text-emerald-400" />
                        <span>Consumo promedio por operación</span>
                    </div>
                </CardContent>
            </Card>

            {/* 15. Gastos por usuario */}
            <Card className="overflow-hidden border-none shadow-xl bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Gastos x Usuario</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Desembolsos por integrante</CardDescription>
                        </div>
                        <UsersIcon className="text-rose-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart data={expenses} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="userId"
                                tickLine={false}
                                axisLine={false}
                                fontSize={11}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                fontSize={11}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                                tickFormatter={(val) => `$${val}`}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="expense"
                                fill="#ef4444"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 16. Ingresos por usuario */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Ingresos x Usuario</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Aportes por integrante</CardDescription>
                        </div>
                        <Target className="text-emerald-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart data={income} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="userId"
                                tickLine={false}
                                axisLine={false}
                                fontSize={11}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                fontSize={11}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                                tickFormatter={(val) => `$${val}`}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="income"
                                fill="#10b981"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 17. Balance por usuario */}
            <Card className="md:col-span-2 overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Balance x Usuario</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Saldo neto por persona</CardDescription>
                        </div>
                        <UsersIcon className="text-zinc-400" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                        <BarChart data={balance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="userId"
                                tickLine={false}
                                axisLine={false}
                                fontSize={11}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                fontSize={11}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                                tickFormatter={(val) => `$${val}`}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="balance"
                                fill="#3f3f46"
                                radius={[4, 4, 0, 0]}
                                barSize={60}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
