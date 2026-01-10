"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
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
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { dailyExpenses, dailyIncome } from "../interfaces"

interface DailyEvolutionChartsProps {
    expenses: dailyExpenses[]
    income: dailyIncome[]
}

export function DailyEvolutionCharts({ expenses, income }: DailyEvolutionChartsProps) {
    const expenseConfig = {
        expense: {
            label: "Gastos",
            color: "#FFB7CE", // Pastel Rose
        },
    } satisfies ChartConfig

    const incomeConfig = {
        income: {
            label: "Ingresos",
            color: "#C1E1C1",
        },
    } satisfies ChartConfig

    return (
        <div className="flex flex-col gap-4">
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Ingresos Diarios</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Detalle de entradas</CardDescription>
                        </div>
                        <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={incomeConfig} className="h-[250px] w-full">
                        <LineChart data={income} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: 'currentColor', fontSize: 11 }}
                                className="text-zinc-500 dark:text-zinc-400 font-medium"
                                tickFormatter={(value) => {
                                    if (!value) return '';
                                    const parts = value.split('-');
                                    return parts.length > 2 ? `${parts[2]}/${parts[1]}` : value;
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
                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="var(--color-income)"
                                strokeWidth={3}
                                dot={{ fill: "var(--color-income)", r: 4, strokeWidth: 2, stroke: "#fff" }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Gastos Diarios</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Detalle de salidas</CardDescription>
                        </div>
                        <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500">
                            <ArrowDownRight size={18} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={expenseConfig} className="h-[250px] w-full">
                        <LineChart data={expenses} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tick={{ fill: 'currentColor', fontSize: 11 }}
                                className="text-zinc-500 dark:text-zinc-400 font-medium"
                                tickFormatter={(value) => {
                                    if (!value) return '';
                                    const parts = value.split('-');
                                    return parts.length > 2 ? `${parts[2]}/${parts[1]}` : value;
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
                            <Line
                                type="monotone"
                                dataKey="expense"
                                stroke="var(--color-expense)"
                                strokeWidth={3}
                                dot={{ fill: "var(--color-expense)", r: 4, strokeWidth: 2, stroke: "#fff" }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                                animationDuration={1500}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
