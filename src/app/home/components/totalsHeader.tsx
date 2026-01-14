"use client";
import { FinanceService } from "../services/api";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, type Variants } from "framer-motion";
import JIcon from "@/components/me/jicon";
import NumberFlow, { continuous } from '@number-flow/react'
import { useGlobalStore } from "@/hooks/useGlobalStore";

const itemVariants: Variants = {
  initial: { opacity: 0, y: 30, skewY: 10 },
  animate: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function TotalsHeader() {
  const { data: session } = useSession();
  const financeService = new FinanceService();
  const [header, setHeader] = useState({ income: 0, expense: 0, total: 0 });
  const refreshFinance = useGlobalStore((state) => state.refreshFinance);

  const getTotals = async () => {
    setHeader({ income: 0, expense: 0, total: 0 });
    const response = await financeService.getTotals(session?.user.token);
    // console.log("totals", response.data);

    if (response.data) {
      setHeader({
        income: response.data.income,
        expense: response.data.expense,
        total: response.data.total,
      });
    }
  };
  3
  useEffect(() => {
    getTotals();
  }, [refreshFinance]);

  return (
    <motion.div variants={itemVariants} initial="initial" animate="animate">
      <div className="grid text-left sm:text-center mb-10 select-none">
        <div className="flex items-center justify-center gap-10">
          <div className="flex flex-col items-center">
            <NumberFlow
              className="text-3xl font-semibold"
              plugins={[continuous]}
              locales="es-PE"
              format={{ style: 'currency', currency: 'PEN' }}
              value={header.total}
            />
            <div className="font-semibold text-zinc-400 dark:text-zinc-600">
              disponible
            </div>
          </div>

          <div className="opacity-70">
            <div className="flex items-center text-xs font-bold text-green-500">
              <JIcon name="down" width="w-3 h-3 mr-1" />
              {header.income.toFixed(2)}
            </div>
            <div className="flex items-center text-xs font-bold text-red-500">
              <JIcon name="down" width="w-3 h-3 rotate-180 mr-1" />{" "}
              {header.expense.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
