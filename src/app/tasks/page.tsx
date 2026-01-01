"use client";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import DrawerTask from "./drawerTask";
import { GetTask, StoreTask } from "./interfaces";

import {
  Plus,
  Calendar,
  Clock,
  DollarSign,
  Search,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Ban,
} from "lucide-react";

const itemVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
};

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function TasksPage() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<GetTask[]>([
    {
      id: 1,
      title: "Comprar suministros",
      description: "Ir al supermercado por snacks y bebidas para la oficina",
      type: "Compras",
      categoryId: 1,
      paymentMethodId: 1,
      date: "2026-01-01",
      hour: "12:00",
      amount: 150,
      status: "pending",
      updatedAt: "2022-01-01T00:00:00.000Z",
      authorId: 1
    },
    {
      id: 2,
      title: "Revisión de Proyecto",
      description: "Meeting trimestral con el equipo de diseño y producto",
      type: "Trabajo",
      categoryId: 2,
      paymentMethodId: 1,
      date: "2026-01-02",
      hour: "09:30",
      amount: 0,
      status: "completed",
      updatedAt: "2022-01-01T00:00:00.000Z",
      authorId: 1
    },
    {
      id: 3,
      title: "Entrega de Proyecto",
      description: "Entrega final del proyecto de diseño web",
      type: "Trabajo",
      categoryId: 2,
      paymentMethodId: 1,
      date: "2026-01-02",
      hour: "09:30",
      amount: 0,
      status: "completed",
      updatedAt: "2022-01-01T00:00:00.000Z",
      authorId: 1
    },
    {
      id: 4,
      title: "Entrega de Proyecto",
      description: "Entrega final del proyecto de diseño web",
      type: "Trabajo",
      categoryId: 2,
      paymentMethodId: 1,
      date: "2026-01-02",
      hour: "09:30",
      amount: 0,
      status: "completed",
      updatedAt: "2022-01-01T00:00:00.000Z",
      authorId: 1
    },
    {
      id: 5,
      title: "Entrega de Proyecto",
      description: "Entrega final del proyecto de diseño web",
      type: "Trabajo",
      categoryId: 2,
      paymentMethodId: 1,
      date: "2026-01-02",
      hour: "09:30",
      amount: 0,
      status: "completed",
      updatedAt: "2022-01-01T00:00:00.000Z",
      authorId: 1
    },
    {
      id: 6,
      title: "Entrega de Proyecto",
      description: "Entrega final del proyecto de diseño web",
      type: "Trabajo",
      categoryId: 2,
      paymentMethodId: 1,
      date: "2026-01-02",
      hour: "09:30",
      amount: 0,
      status: "cancelled",
      updatedAt: "2022-01-01T00:00:00.000Z",
      authorId: 1
    },
    {
      id: 7,
      title: "Entrega de Proyecto",
      description: "Entrega final del proyecto de diseño web",
      type: "Trabajo",
      categoryId: 2,
      paymentMethodId: 1,
      date: "2026-01-02",
      hour: "09:30",
      amount: 0,
      status: "completed",
      updatedAt: "2022-01-01T00:00:00.000Z",
      authorId: 1
    }
  ]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedTask, setSelectedTask] = useState<StoreTask | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateTask = (taskData: StoreTask) => {
    if (taskData.id) {
      setTasks(prev => prev.map(t => t.id === taskData.id ? { ...t, ...taskData } as GetTask : t));
    } else {
      setTasks(prev => {
        const nextId = prev.length > 0 ? Math.max(...prev.map(t => t.id)) + 1 : 1;
        const newTask: GetTask = {
          ...taskData as GetTask,
          id: nextId,
          updatedAt: new Date().toISOString(),
          authorId: 1,
        };
        return [newTask, ...prev];
      });
    }
    setShowDrawer(false);
  };

  const openNewTask = () => {
    setSelectedTask({
      title: "",
      description: "",
      type: "Personal",
      categoryId: 1,
      paymentMethodId: 1,
      date: new Date().toISOString().split('T')[0],
      hour: "12:00",
      amount: 0,
      status: "pending",
    });
    setShowDrawer(true);
  };

  const editTask = (task: GetTask) => {
    setSelectedTask({
      id: task.id,
      title: task.title,
      description: task.description,
      type: task.type,
      categoryId: task.categoryId,
      paymentMethodId: task.paymentMethodId,
      date: task.date,
      hour: task.hour,
      amount: task.amount,
      status: task.status,
    });
    setShowDrawer(true);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-zinc-100 dark:border-zinc-800" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-t-2 border-zinc-900 dark:border-zinc-100 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <div className=" bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl border-b border-zinc-200/60 dark:border-zinc-800/50 pt-16 pb-4 mt-2">

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
                    Tareas
                  </h1>
                  <p className="text-[10px]  tracking-[0.2em] font-black text-zinc-400 dark:text-zinc-500">
                    Automatizadas
                  </p>
                </div>

                {tasks.length > 0 && (
                  <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs font-bold">
                      <span className="text-zinc-900 dark:text-zinc-100">{tasks.filter(t => t.status === 'completed').length}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                    </div>
                    <div className="w-px h-3 bg-zinc-200 dark:border-zinc-800" />
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs font-bold">
                      <span className="text-zinc-900 dark:text-zinc-100">{tasks.filter(t => t.status === 'pending').length}</span>
                      <Clock className="w-3.5 h-3.5 text-amber-500" strokeWidth={3} />
                    </div>
                    {tasks.filter(t => t.status === 'cancelled').length > 0 && (
                      <>
                        <div className="w-px h-3 bg-zinc-200 dark:border-zinc-800" />
                        <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs font-bold">
                          <span className="text-zinc-900 dark:text-zinc-100">{tasks.filter(t => t.status === 'cancelled').length}</span>
                          <Ban className="w-3.5 h-3.5 text-rose-500" strokeWidth={3} />
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSearching(true)}
                    className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95"
                  >
                    <Search className="w-5 h-5" strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={openNewTask}
                    className="w-10 h-10 flex items-center justify-center bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl shadow-lg shadow-zinc-900/10 dark:shadow-none active:scale-90 transition-all hover:opacity-90"
                  >
                    <Plus className="w-6 h-6" strokeWidth={3} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="search-header"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar tareas..."
                    className="w-full h-11 pl-11 pr-4 bg-zinc-100 dark:bg-zinc-900/80 border border-transparent focus:border-zinc-200 dark:focus:border-zinc-800 focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-sm font-medium transition-all outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearching(false);
                    setSearchQuery("");
                  }}
                  className="px-4 h-11 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                >
                  Cancelar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <main className="max-w-xl mx-auto md:px-6 px-4 py-4 pb-6 overflow-y-auto h-[calc(100vh-10rem)]">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {tasks
              .filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((task) => (
                <motion.div
                  key={task.id}
                  variants={itemVariants}
                  layout
                  onClick={() => editTask(task)}
                  className="group relative bg-white dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 p-3 rounded-[24px] transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/30 active:scale-[0.98] cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`shrink-0 transition-transform group-hover:scale-110 ${task.status === 'completed' ? 'text-emerald-500' : 'text-zinc-300 dark:text-zinc-700'
                      }`}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
                      ) : (
                        <Circle className="w-5 h-5" strokeWidth={2.5} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <h3 className={`text-base font-bold truncate ${task.status === 'completed' ? 'text-zinc-400 dark:text-zinc-500 line-through' : 'text-zinc-900 dark:text-zinc-100'}`}>
                            {task.title}
                          </h3>
                          {task.amount > 0 && (
                            <div className="shrink-0 flex items-center bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-lg text-[10px] font-black text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50">
                              <DollarSign className="w-2.5 h-2.5 mr-0.5" />
                              {task.amount.toLocaleString()}
                            </div>
                          )}
                        </div>

                        <p className="text-zinc-500 dark:text-zinc-400 text-[13px] leading-snug line-clamp-1 font-medium opacity-80 mb-2">
                          {task.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                              {task.type}
                            </span>
                            <div className="flex items-center gap-3 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.hour}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {task.date}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">Editar</span>
                            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* {tasks.length > 5 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-bold">
            <ArrowUpRight className="w-4 h-4" />
            <span>Desliza para ver más</span>
          </div>
        </div>
      )} */}

      {showDrawer && selectedTask && (
        <DrawerTask
          show={showDrawer}
          onUpdate={handleUpdateTask}
          data={selectedTask}
          onClose={() => setShowDrawer(false)}
        />
      )}
    </div>
  );
}
