"use client";
import { FinanceService } from "../services/api";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import JIcon from "@/components/me/jicon";

interface Props {
  date: string;
}

//Me quedo con este
// const itemVariants = {
//   initial: { opacity: 0, rotateY: 90 },
//   animate: {
//     opacity: 1,
//     rotateY: 0,
//     transition: { duration: 0.6, ease: "easeInOut" },
//   },
// };

//Puede ser
const itemVariants = {
  initial: { opacity: 0, y: 30, skewY: 10 },
  animate: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function TotalsHeader({ date }: Props) {
  const { data: session } = useSession();
  const financeService = new FinanceService();
  const [header, setHeader] = useState({ income: 0, expense: 0, total: 0 });

  const getTotals = async () => {
    setHeader({ income: 0, expense: 0, total: 0 });
    const response = await financeService.getTotals(session?.user.token);
    console.log("response totals", response);

    // if (response.data !== 0) {
    //   setHeader({
    //     income: response.data.income,
    //     expense: response.data.expense,
    //     total: response.data.total,
    //   });
    // }
  };

  useEffect(() => {
    if (date) {
      // getTotals();
    }
  }, [date]);

  return (
    <motion.div variants={itemVariants} initial="initial" animate="animate">
      <div className="grid text-left sm:text-center mb-10 select-none">
        <div className="flex items-center justify-center gap-10">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-semibold">
              S/. {header.total.toFixed(2)}
            </div>
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
