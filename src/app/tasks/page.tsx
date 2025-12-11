"use client";
import { useSession } from "next-auth/react";
// import { CategoryService } from "./services/api";
import { motion, Variants } from "framer-motion";
import JIcon from "@/components/me/jicon";
import { useEffect, useState, useCallback } from "react";
import { AreaChart } from "lucide-react";
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
          <div className="text-xl font-semibold">Tareas</div>
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
         <AreaChart />
        </motion.div>
      </main>

    </div>
  );
}
