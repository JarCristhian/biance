"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import isoWeek from "dayjs/plugin/isoWeek";
import { useGlobalStore } from "@/store/globalState";
dayjs.locale("es");
dayjs.extend(isoWeek);

interface DateI {
  year: number;
  month: string;
  week: number;
}

interface Props {
  setDString: (date: DateI) => void;
}

const itemVariants: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Weekdays({ setDString }: Props) {
  const [week, setWeek] = useState(dayjs().isoWeek());
  const [year, setYear] = useState(dayjs().year());
  const { setDaySelected } = useGlobalStore();

  const [days, setDays] = useState<
    { day: string; number: number; date: string; active: boolean }[]
  >([]);

  const getWeek = (week: number, year: number) => {
    const monday = dayjs().year(year).isoWeek(week).startOf("isoWeek");

    const daysWeek = Array.from({ length: 7 }, (_, i) => {
      const day = monday.add(i, "day");
      return {
        day: day.format("dddd").slice(0, 3),
        number: day.date(),
        date: day.format("YYYY-MM-DD"),
        active: day.isSame(dayjs(), "day"),
      };
    });

    const firstDay = daysWeek[0];
    const month = dayjs(firstDay.date).format("MMMM");
    // console.log(month);

    setDString({
      year: year,
      month: month,
      week: week,
    });

    setDays(daysWeek);
  };

  const backWeek = () => {
    setYear(week === 1 ? year - 1 : year);
    setWeek(week === 1 ? 52 : week - 1);
  };

  const nextWeek = () => {
    setYear(week === 52 ? year + 1 : year);
    setWeek(week === 52 ? 1 : week + 1);
  };

  useEffect(() => {
    getWeek(week, year);
  }, [week]);

  const setValue = (date: string) => {
    const updatedDays = days.map((d) => ({
      ...d,
      active: d.date === date,
    }));

    setDays(updatedDays);
    setDaySelected(date);
  };

  return (
    <motion.div variants={itemVariants} initial="initial" animate="animate">
      <div className="flex w-full justify-center gap-2 md:gap-3 text-sm font-semibold mb-10 items-center">
        <div
          className="cursor-pointer opacity-25 active:opacity-100 hover:dark:opacity-100"
          onClick={backWeek}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64"
            />
          </svg>
        </div>

        {days.map((day) => (
          <div
            key={day.day}
            className={`flex items-center justify-center h-12 w-12 rounded-2xl cursor-pointer select-none  ${day.active
              ? "text-zinc-800 dark:text-white bg-zinc-200/70 dark:bg-zinc-800/70"
              : "text-zinc-400/80 hover:text-zinc-800  hover:dark:text-white  "
              }`}
            onClick={() => setValue(day.date)}
          >
            <div className="flex flex-col items-center">
              <span className="capitalize font-semibold hover:font-semibold">
                {day.day}
              </span>
              <span className="text-xs">{day.number}</span>
            </div>
          </div>
        ))}

        <div
          className="rotate-180  cursor-pointer opacity-25 active:opacity-100 hover:dark:opacity-100"
          onClick={nextWeek}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
