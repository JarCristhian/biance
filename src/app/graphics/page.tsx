"use client";
import { useSession } from "next-auth/react";
// import { CategoryService } from "./services/api";
import { motion, Variants } from "framer-motion";
import JIcon from "@/components/me/jicon";
import { useEffect, useState, useCallback } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";

// import { GetCategory, StoreCategory } from "./interfaces";
// import DrawerCategory from "./drawerCategory";

const itemVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};



const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig



export default function Category() {
  const { data: session, status } = useSession();
  // const categoryService = new CategoryService();
  // const [category, setCategories] = useState<GetCategory[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [dataCategory, setDataCategory] = useState<StoreCategory>({
  //   name: "",
  //   typeId: 1,
  //   status: true,
  // });

  const getCategories = useCallback(async () => {
    if (!session?.user?.token) return;
    try {
      setLoading(true);
      // setCategories([]);
      // const response = await categoryService.getCategories(session.user.token);
      // console.log(response);

      // if (response.status === 200) {
      //   setCategories(response.data);
      //   setTimeout(() => {
      //   setLoading(false);
      // }, 300);
      // }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  }, [session?.user?.token]);

  useEffect(() => {
    if (status === "authenticated") {
      getCategories();
    }
  }, [getCategories, status]);

  if (status === "loading") {
    return (
      <div className="loading-page bg-white dark:bg-[#0a0911]">
        <span className="loader" />
      </div>
    );
  }

  if (!session) { return redirect("/login"); }

  const editCategory = (category: any) => {
    // setDataCategory({
    //   id: category.id,
    //   name: category.name,
    //   typeId: category.type,
    //   status: category.status,
    // });
    setShow(true);
  };

  const newCategory = () => {
    // setDataCategory({
    //   name: "",
    //   typeId: 1,
    //   status: true,
    // });
    setShow(true);
  };

  return (
    <div className="h-screen w-full max-w-xl mx-auto overflow-x-hidden overflow-y-scroll scrollbar dark:scrollbar-dark">
      <main className="items-center p-2 mt-20">
        <div className="flex gap-3 justify-around  mb-10 mt-3 select-none">
          <div className="text-xl font-semibold">Graficos</div>
          {/* <div
            className="flex items-center justify-center text-green-500 hover:bg-green-100/50 active:bg-green-100/50
           hover:dark:bg-green-900/20 active:dark:bg-green-900/20 
           active:scale-90 duration-200 rounded-xl py-1 px-3 cursor-pointer"
            onClick={newCategory}
          >
            + Nuevo
          </div> */}
        </div>

        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          className="flex justify-center"
        >
          <Card>
            <CardHeader>
              <CardTitle>Area Chart</CardTitle>
              <CardDescription>
                Showing total visitors for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer={true}
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 leading-none">
                    January - June 2024
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

    </div>
  );
}
