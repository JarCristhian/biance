"use client";
import { useSession } from "next-auth/react";
import { CategoryService } from "./services/api";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import { GetCategory, StoreCategory } from "./interfaces";
import DrawerCategory from "./drawerCategory";
import {
  Plus,
  Search,
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  PackagePlus,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/me/button";
import { Skeleton } from "@/components/ui/skeleton";

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export default function Category() {
  const { data: session, status } = useSession();
  const categoryService = useMemo(() => new CategoryService(), []);
  const [categories, setCategories] = useState<GetCategory[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [dataCategory, setDataCategory] = useState<StoreCategory>({
    name: "",
    typeId: 1,
    status: true,
  });

  const getCategories = useCallback(async () => {
    if (status !== "authenticated" || !session?.user?.token) return;
    try {
      setLoading(true);
      const response = await categoryService.getCategories(session.user.token);
      if (response && response.status === 200) {
        const data = Array.isArray(response.data) ? response.data : [];
        // console.log(data);
        setCategories(data);
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.token, status, categoryService]);

  useEffect(() => {
    if (status === "authenticated") {
      getCategories();
    }
  }, [getCategories, status]);

  const editCategory = (cat: GetCategory) => {
    setDataCategory({
      id: cat.id,
      name: cat.name,
      typeId: cat.type,
      status: cat.status,
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

  const filteredCategories = useMemo(() => {
    return (categories || []).filter(cat =>
      cat.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950">
        <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200/50 dark:border-zinc-800/50 pt-16 pb-4">
          <div className="max-w-lg mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-9 h-9 rounded-xl" />
                <Skeleton className="w-24 h-9 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-xl mx-auto px-6 py-8 space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-zinc-900/50 rounded-[20px] border border-zinc-200/50 dark:border-zinc-800/50">
              <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!session) { return redirect("/login"); }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 pt-16 pb-4">
        <div className="max-w-lg mx-auto px-4">
          <AnimatePresence mode="wait">
            {!isSearching ? (
              <motion.div
                key="default-header"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col -space-y-1">
                  <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Categorías
                  </h1>
                  <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500">
                    Gestiona tus tipos de transacciones
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSearching(true)}
                    className="w-9 h-9 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95"
                  >
                    <Search className="w-4.5 h-4.5" strokeWidth={2.5} />
                  </button>

                  <Button
                    onClick={newCategory}
                    className="group relative px-3.5"
                  >
                    <Plus className="w-4 h-4" strokeWidth={3} />
                    <span className="text-xs font-bold">Nuevo</span>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="search-header"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar categorías..."
                    className="w-full h-11 pl-10 pr-4 bg-zinc-100 dark:bg-zinc-900/80 border border-transparent focus:border-zinc-900/10 dark:focus:border-zinc-100/10 focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-xs font-bold transition-all outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearching(false);
                    setSearch("");
                  }}
                  className="px-3 h-11 text-xs font-black text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-colors"
                >
                  Cancelar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <main className="max-w-xl mx-auto px-6 py-3 overflow-hidden overflow-y-auto h-[calc(100vh-16rem)]">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid gap-3"
        >

          <AnimatePresence mode="popLayout" initial={false}>
            {loading ? (
              <div className="grid gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-zinc-900/50 rounded-[20px] border border-zinc-200/50 dark:border-zinc-800/50">
                    <Skeleton className="w-11 h-11 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Skeleton className="h-4 w-12 rounded-md" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) :
              filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => editCategory(cat)}
                  className="group relative bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 p-3 rounded-[20px] transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-[0.99] cursor-pointer hover:shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-sm ${cat.type === 1
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400'
                        }`}>
                        {cat.type === 1 ? <ArrowUpCircle className="w-6 h-6" /> : <ArrowDownCircle className="w-6 h-6" />}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-50 truncate">
                              {cat.name}
                            </h3>
                            <span className={`shrink-0 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${cat.type === 1
                              ? 'bg-emerald-50/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-500/10'
                              : 'bg-rose-50/50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100/50 dark:border-rose-500/10'
                              }`}>
                              {cat.type === 1 ? 'Ingreso' : 'Gasto'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500">
                            {cat.createdAt}
                          </p>
                          {!cat.status && (
                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200/50 dark:border-zinc-700/50">
                              Inactivo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col">
                        <span className={`shrink-0 text-[8px] max-w-[70px] text-center font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${cat.status ? 'bg-emerald-50/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-500/10' : 'bg-red-50/50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100/50 dark:border-red-500/10'}`}>
                          {cat.status ? 'Activo' : 'Inactivo'}
                        </span>
                        <p className="text-[10px] opacity-40 text-zinc-900 dark:text-zinc-50">{cat.createdAt}</p>
                      </div>
                      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <ChevronRight className="w-4 h-4 text-zinc-400" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </AnimatePresence>

          {filteredCategories.length === 0 && !loading && (
            <div
              className="py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-[32px] bg-zinc-100 dark:bg-zinc-900 mb-6">
                <PackagePlus className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Sin categorías</h3>
              <p className="text-zinc-500 dark:text-zinc-500 max-w-[240px] mx-auto text-sm font-medium">
                Tu lista de categorías está vacía. Empieza por agregar una nueva categoría.
              </p>
            </div>
          )}

        </motion.div>
      </main>

      {show && (
        <DrawerCategory
          show={show}
          onClose={() => setShow(false)}
          onUpdate={getCategories}
          data={dataCategory}
        />
      )}
    </div>
  );
}