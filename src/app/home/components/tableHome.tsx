"use client";
import { FinanceService } from "../services/api";
import { useEffect, useState } from "react";
import { GetFinance } from "../interfaces";
import { useSession } from "next-auth/react";
import { motion, type Variants } from "framer-motion";
import JIcon from "@/components/me/jicon";

interface Props {
  date: string;
}

const itemVariants:Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const totalChilds:Variants = {
  initial: { opacity: 0, rotateY: 90 },
  animate: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export default function TableHome({ date }: Props) {
  const { data: session } = useSession();
  const financeService = new FinanceService();
  const [finance, setFinance] = useState<GetFinance[]>([]);
  const [header, setHeader] = useState({ income: 0, expense: 0 });

  const getTotal = (data: GetFinance[]) => {
    const totals = data.reduce(
      (acc, item) => {
        acc.income += item.income;
        acc.expense += item.expense;
        return acc;
      },
      { income: 0, expense: 0 }
    );
    setHeader(totals);
  };

  const getFinances = async () => {
    setFinance([]);
    setHeader({ income: 0, expense: 0 });
    const response = await financeService.getFinances(
      {
        date: date,
      },
      session?.user.token
    );

    if (response.data !== 0) {
      getTotal(response.data);
      setFinance(response.data);
    }
  };

  useEffect(() => {
    if (date) {
      getFinances();
    }
  }, [date]);

  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center w-full mt-10"
    >
      <div className="flex gap-6 justify-center items-center select-none">
        <div className="flex flex-col items-center justify-center gap-1 bg-green-100/50 dark:bg-zinc-800/70  rounded-full w-40 h-40 p-4 text-green-500">
          <motion.div
            variants={totalChilds}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-medium">
              S/. {header.income.toFixed(2)}
            </span>
            <span className="text-lg">Ingresos</span>
          </motion.div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 bg-fuchsia-200/40 dark:bg-zinc-800/70 rounded-full w-40 h-40 p-4 text-red-500">
          <motion.div
            variants={totalChilds}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-medium">
              S/. {header.expense.toFixed(2)}
            </span>
            <span className="text-lg">Gastos</span>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full sm:w-4/5 md:w-5/6 justify-center mt-6">
        <h3 className="text-xl font-semibold mb-2 opacity-85">
          Transacciones del día  {finance.length ? `(${finance.length})` : ""}
        </h3>

        <div className="flex flex-col items-center w-full overflow-y-scroll scrollbar dark:scrollbar-dark h-[30vh]">

        {finance.map((invoice, index) => (
          <div
            key={invoice.id}
            className="w-full flex justify-between items-center py-2 px-4 border-b border-zinc-200/50 dark:border-zinc-900"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full bg-zinc-200/50 dark:bg-zinc-800/70 w-9 h-9 justify-center mr-4">
                <JIcon
                  name="arrow"
                  width={
                    "w-5 " +
                    (invoice.income > 0
                      ? "text-green-500"
                      : "text-red-500 rotate-180")
                  }
                />
              </div>
              <div className="flex flex-col text-sm font-medium">
                <strong>{invoice.category}</strong>
                <span className="text-xs opacity-50">{invoice.hour}</span>
              </div>
            </div>

            <div>
              <div
                className={
                  "flex items-center justify-end gap-1 " +
                  (invoice.income > 0 ? "text-green-500" : "text-red-500")
                }
              >
                <strong>{invoice.income > 0 ? "+" : "-"}</strong>
                S/.{" "}
                {invoice.income > 0
                  ? Number(invoice.income).toFixed(2)
                  : Number(invoice.expense).toFixed(2)}
              </div>
            </div>
          </div>
        ))}

        {finance.length == 0 && (
          <div className="text-center opacity-10 mt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3em"
              height="3em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                color="currentColor"
              >
                <path d="m12.88 7.017l4.774 1.271m-5.796 2.525l2.386.636m-2.267 6.517l.954.255c2.7.72 4.05 1.079 5.114.468c1.063-.61 1.425-1.953 2.148-4.637l1.023-3.797c.724-2.685 1.085-4.027.471-5.085s-1.963-1.417-4.664-2.136l-.954-.255c-2.7-.72-4.05-1.079-5.113-.468c-1.064.61-1.426 1.953-2.15 4.637l-1.022 3.797c-.724 2.685-1.086 4.027-.471 5.085c.614 1.057 1.964 1.417 4.664 2.136" />
                <path d="m12 20.946l-.952.26c-2.694.733-4.04 1.1-5.102.477c-1.06-.622-1.422-1.99-2.143-4.728l-1.021-3.872c-.722-2.737-1.083-4.106-.47-5.184C2.842 6.966 4 7 5.5 7" />
              </g>
            </svg>
          </div>
        )}
        </div>
      </div>
    </motion.div>
  );
}
