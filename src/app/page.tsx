"use client";
import { useSession } from "next-auth/react";
import { Menu } from "../components/me/Menu";
import { useState } from "react";
import { NavBar } from "../components/me/NavBar";
import TableHome from "../app/home/components/tableHome";
import DrawerBiance from "../app/home/components/drawerBiance";
import Weekdays from "../app/home/components/weekdays";
import dayjs from "dayjs";
import TotalsHeader from "../app/home/components/totalsHeader";
import { redirect } from "next/navigation";
import { StoreFinance } from "../app/home/interfaces";

interface DateI {
  year: number;
  month: string;
  week: number;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);
  const [menu, setMenu] = useState<number>(0);
  const [dString, setDString] = useState<DateI>({
    year: dayjs().year(),
    month: dayjs().month().toString(),
    week: dayjs().isoWeek(),
  });
  const [dataFinance, setDataFinance] = useState<StoreFinance>(
    {
      amount: "",
      description: "",
      paymentMethod: 1,
      category: null,
      date: dayjs().toDate(),
      type: type,
    }
  );

  const openNewFinance = (type: number) => {
    setType(type);
    setDataFinance({
      id: undefined,
      amount: "",
      description: "",
      paymentMethod: 1,
      category: null,
      date: dayjs().toDate(),
      type,
    });
    setShow(true);
  };

  const openEditFinance = (finance: StoreFinance) => {
    setType(finance.type);
    setDataFinance(finance);
    setShow(true);
  };

  if (status === "loading") {
    return (
      <div className="loading-page bg-white dark:bg-[#0a0911]">
        <span className="loader" />
      </div>
    );
  }

  if (!session) { return redirect("/login"); }

  return (
    <>
      <Menu onOpen={openNewFinance} menu={menu} />
      <NavBar />
      <div className="h-screen w-full p-4 overflow-x-hidden overflow-y-scroll scrollbar dark:scrollbar-dark text-zinc-600 dark:text-zinc-200">
        <main className="items-center p-2 pt-14 md:px-16 w-full max-w-2xl mx-auto">

          <div className="flex justify-between items-center mb-10 mt-3 md:px-20 px-4 select-none">
            <div className="flex gap-3 justify-start sm:justify-center cursor-pointer">
              <div className={`text-xl font-semibold ${menu === 0 ? "text-zinc-600 dark:text-primary" : "text-primary dark:text-zinc-600"}`} onClick={() => setMenu(0)}>Efectivo</div>
              <div className={`text-xl font-semibold ${menu === 1 ? "text-zinc-600 dark:text-primary" : "text-primary dark:text-zinc-600"}`} onClick={() => setMenu(1)}>
                Ahorros
              </div>
            </div>

            <div className="flex gap-3 justify-end sm:justify-center">
              <div className="text-xl">
                <div className="text-sm opacity-90 font-semibold">
                  <span className="font-bold capitalize">{dString.month}</span>,{" "}
                  {dString.year}
                </div>
                <div className="text-xs opacity-40 -mt-1 font-medium">
                  Semana {dString.week}
                </div>
              </div>
            </div>
          </div>

          <TotalsHeader menu={menu} />

          <Weekdays setDString={setDString} />

          <TableHome setDataFinance={openEditFinance} menu={menu} />
        </main>
      </div>
      <DrawerBiance
        show={show}
        type={type}
        data={dataFinance}
        onClose={() => setShow(!show)}
      />
    </>
  );
}
