"use client";
import { useSession } from "next-auth/react";
import { CategoryService } from "./services/api";
import { motion, Variants } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/me/Table";
import { Input } from "@/components/me/input";
import JIcon from "@/components/me/jicon";
import { useEffect, useState, useCallback } from "react";
import { GetCategory, StoreCategory } from "./interfaces";
import DrawerCategory from "./drawerCategory";

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
  const categoryService = new CategoryService();
  const [category, setCategories] = useState<GetCategory[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")

  const [dataCategory, setDataCategory] = useState<StoreCategory>({
    name: "",
    typeId: 1,
    status: true,
  });

  const getCategories = useCallback(async () => {
    if (!session?.user?.token) return;
    try {
      setLoading(true);
      setCategories([]);
      const response = await categoryService.getCategories(session.user.token);
      // console.log(response);

      if (response.status === 200) {
        setCategories(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
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

  const editCategory = (category: GetCategory) => {
    setDataCategory({
      id: category.id,
      name: category.name,
      typeId: category.type,
      status: category.status,
    });
    setShow(true);
  };

  const newCategory = () => {
    setDataCategory({
      name: "",
      typeId: 1,
      status: true,
    });
    setShow(true);
  };

  return (
    <div className="h-screen w-full max-w-xl mx-auto overflow-x-hidden overflow-y-scroll scrollbar dark:scrollbar-dark">
      <main className="items-center mt-20">

        <div className="flex gap-3 justify-between max-w-2xl mb-10 mt-3 px-8 select-none">
          <div className="text-xl font-semibold">Categorias</div>
          <div className="flex gap-2">

            <Input
              className="h-7 text-xs"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              autoComplete="off"
              placeholder="Buscar..."
            />

            <div
              className="flex items-center w-[120px] justify-center text-green-500 hover:bg-green-100/50 active:bg-green-100/50
            hover:dark:bg-green-900/20 active:dark:bg-green-900/20 
            active:scale-90 duration-200 rounded-xl py-1 px-3 cursor-pointer"
              onClick={newCategory}
            >
              + Nuevo
            </div>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          className="flex justify-center overflow-auto h-[70dvh]"
        >
          <div className="flex items-center justify-center">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead className="w-24">Tipo</TableHead>
                  <TableHead className="w-56">Nombre</TableHead>
                  <TableHead>Creado</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : (
                  category.map((item, index) => (
                    <TableRow key={item.id} className="group">
                      <TableCell>{index}</TableCell>
                      <TableCell
                        className={
                          item.type == 1 ? "text-green-500" : "text-red-500"
                        }
                      >
                        {item.type == 1 ? "+ Ingreso" : "- Gasto"}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell>
                        <div
                          className="block md:hidden group-hover:block cursor-pointer active:scale-90 duration-200"
                          onClick={() => editCategory(item)}
                        >
                          <JIcon name="edit" width="w-5" />
                        </div>
                      </TableCell>
                    </TableRow>
                  )))}

                {!loading && category.length == 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center opacity-10">
                      <span className="flex items-center justify-center mt-2">
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
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </main>

      <DrawerCategory
        show={show}
        onClose={() => setShow(!show)}
        onUpdate={getCategories}
        data={dataCategory}
      />
    </div>
  );
}
