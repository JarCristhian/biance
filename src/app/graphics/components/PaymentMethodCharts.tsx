"use client"

import * as React from "react"
import { Pie, PieChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts"
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
import { CreditCard, Landmark, History, TrendingUp, Wallet } from "lucide-react"
import { expensesByPaymentMethod, incomeByPaymentMethod, paymentMethodUsage, paymentMethodTrend } from "../interfaces"

interface PaymentMethodChartsProps {
    expenses: expensesByPaymentMethod[]
    income: incomeByPaymentMethod[]
    usage: paymentMethodUsage[]
    trend: paymentMethodTrend[]
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

export function PaymentMethodCharts({ expenses, income, usage, trend }: PaymentMethodChartsProps) {
    const chartConfig = {
        expense: {
            label: "Gastos",
            theme: {
                light: "#FFB7CE",
                dark: "#FF80A0",
            },
        },
        income: {
            label: "Ingresos",
            theme: {
                light: "#C1E1C1",
                dark: "#93C47D",
            },
        },
        count: {
            label: "Frecuencia",
            theme: {
                light: "#A7C7E7",
                dark: "#7FB3E0",
            },
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
            {/* 11. Gastos por método de pago */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Gasto por Método</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Distribución de egresos</CardDescription>
                        </div>
                        <CreditCard className="text-indigo-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <PieChart>
                            <Pie
                                data={expenses}
                                dataKey="expense"
                                nameKey="paymentMethodName"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                animationDuration={1500}
                            >
                                {expenses.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`var(--color-chart${(index % 5) + 1})`} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent nameKey="paymentMethodName" />} />
                            <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 12. Ingresos por método de pago */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Ingreso por Método</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Entradas por canal</CardDescription>
                        </div>
                        <Wallet className="text-emerald-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart data={income} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="paymentMethodName"
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
                            <ChartTooltip content={<ChartTooltipContent nameKey="paymentMethodName" />} />
                            <Bar
                                dataKey="income"
                                fill="var(--color-income)"
                                radius={[4, 4, 0, 0]}
                                barSize={30}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 13. Uso de métodos de pago (frecuencia) */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Frecuencia</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Uso de métodos de pago</CardDescription>
                        </div>
                        <TrendingUp className="text-blue-500" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart
                            data={usage}
                            layout="vertical"
                            margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
                        >
                            <CartesianGrid horizontal={false} className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="paymentMethodName"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                fontSize={10}
                                width={80}
                                className="text-zinc-500 dark:text-zinc-400 font-bold"
                            />
                            <ChartTooltip content={<ChartTooltipContent nameKey="paymentMethodName" />} />
                            <Bar
                                dataKey="usage"
                                fill="var(--color-count)"
                                radius={[0, 4, 4, 0]}
                                barSize={15}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* 14. Tendencia de uso */}
            <Card className="overflow-hidden border-none shadow-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black text-zinc-800 dark:text-zinc-100 uppercase tracking-tighter">Evolución</CardTitle>
                            <CardDescription className="text-zinc-500 dark:text-zinc-400">Tendencia de uso temporal</CardDescription>
                        </div>
                        <History className="text-zinc-400" size={18} />
                    </div>
                </CardHeader>
                <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <LineChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" opacity={0.5} />
                            <XAxis
                                dataKey="paymentMethodName"
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
                            />
                            <ChartTooltip content={<ChartTooltipContent nameKey="paymentMethodName" />} />
                            <Line
                                type="monotone"
                                dataKey="usage"
                                stroke="var(--color-count)"
                                strokeWidth={3}
                                dot={{ r: 4, strokeWidth: 0, fill: "var(--color-count)" }}
                                animationDuration={2000}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
