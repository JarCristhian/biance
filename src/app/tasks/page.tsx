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
    }
  ]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedTask, setSelectedTask] = useState<StoreTask | null>(null);

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

        <div className="max-w-lg mx-auto space-y-6">
          <div className="flex justify-between items-center px-4">
            <div className="flex flex-col -space-y-0.5">
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Tareas
              </h1>

              {tasks.length > 0 && (
                <div className="flex items-center gap-2 opacity-70">
                  {tasks.filter(t => t.status === 'completed').length > 0 && (
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs font-medium mt-0.5">
                      {tasks.filter(t => t.status === 'completed').length}
                      <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
                    </div>
                  )}

                  {tasks.filter(t => t.status === 'pending').length > 0 && (
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs font-medium mt-0.5">
                      {tasks.filter(t => t.status === 'pending').length}
                      <Clock className="w-3 h-3" strokeWidth={3} />
                    </div>
                  )}

                  {tasks.filter(t => t.status === 'cancelled').length > 0 && (
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs font-medium mt-0.5">
                      {tasks.filter(t => t.status === 'cancelled').length}
                      <Ban className="w-3 h-3" strokeWidth={3} />
                    </div>
                  )}
                </div>
              )}

            </div>

            <div className="flex items-center gap-2">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full h-12 pl-11 pr-4 bg-zinc-100 dark:bg-zinc-900/80 border-zinc-200/50 dark:border-zinc-800 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 rounded-2xl text-sm font-medium transition-all outline-none"
                />
              </div>

              <button
                onClick={openNewTask}
                className="w-12 h-12 flex items-center cursor-pointer justify-center bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl shadow-xl shadow-zinc-900/10 dark:shadow-none active:scale-90 transition-all hover:opacity-90"
              >
                <Plus className="w-6 h-6" strokeWidth={3} />
              </button>
            </div>

          </div>
        </div>
      </div>

      <main className="max-w-xl mx-auto md:px-6 px-4 py-4 pb-32">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                variants={itemVariants}
                layout
                onClick={() => editTask(task)}
                className="group relative bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 p-4 rounded-[28px] transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/40 active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className={`mt-1 shrink-0 transition-colors ${task.status === 'completed' ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-300 dark:text-zinc-700 hover:text-zinc-400'
                    }`}>
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700`}>
                        {task.type}
                      </span>
                      <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.hour}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold truncate ${task.status === 'completed' ? 'text-zinc-400 dark:text-zinc-500 line-through' : 'text-zinc-900 dark:text-zinc-100'}`}>
                      {task.title}
                    </h3>

                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-1 font-medium italic opacity-80">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-400 dark:text-zinc-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {task.date}
                        </div>
                        {task.amount > 0 && (
                          <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 rounded-md text-[11px] font-black text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                            <DollarSign className="w-3 h-3 mr-0.5" />
                            {task.amount.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {tasks.length > 5 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-bold">
            <ArrowUpRight className="w-4 h-4" />
            <span>Desliza para ver más</span>
          </div>
        </div>
      )}

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
