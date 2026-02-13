"use client";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DrawerTask from "./drawerTask";
import { GetTask, StoreTask } from "./interfaces";
import { Button } from "@/components/me/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskService } from "./services/api";
import useSocket from "@/hooks/useWebsocket";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useGlobalStore } from "@/hooks/useGlobalStore";

import {
  Plus,
  Calendar,
  Clock,
  DollarSign,
  Search,
  ChevronRight,
  CheckCircle2,
  Ban,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function TasksPage() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<GetTask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedTask, setSelectedTask] = useState<StoreTask | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const taskService = new TaskService();
  const { newNotification } = useSocket();
  const { daySelected } = useGlobalStore();

  useEffect(() => {
    const token = (session as any)?.token || (session as any)?.user?.token || (session as any)?.accessToken;
    if (token) {
      fetchTasks(token);
    }
  }, [session]);

  useEffect(() => {
    if (newNotification) {
      const token = (session as any)?.token || (session as any)?.user?.token || (session as any)?.accessToken;
      fetchTasks(token);
    }
  }, [newNotification]);

  const fetchTasks = async (token?: string) => {
    if (!token) return;
    try {
      setLoadingTasks(true);
      const result = await taskService.getTasks({}, token);
      // console.log("Tasks fetched:", result.data);
      setTasks(result.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleUpdateTask = async (taskData: StoreTask) => {
    const token = (session as any)?.token || (session as any)?.user?.token || (session as any)?.accessToken;
    try {
      if (taskData.id) {
        await taskService.updateTask(taskData.id, taskData, token);
      } else {
        await taskService.postTask(taskData, token);
      }
      fetchTasks(token);
      setShowDrawer(false);
    } catch (error) {
      toast.error("Error al guardar la tarea");
      console.error(error);
    }
  };

  const openNewTask = () => {
    setSelectedTask({
      title: "",
      description: "",
      type: "Personal",
      categoryId: 1,
      paymentMethodId: 1,
      conditionDate: daySelected || new Date().toISOString().split('T')[0],
      hour: "12:00",
      frequency: "daily",
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
      conditionDate: task.conditionDate,
      hour: task.hour,
      frequency: task.frequency,
      amount: task.amount,
      status: task.status,
    });
    setShowDrawer(true);
  };

  if (loadingTasks) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl border-b border-zinc-200/60 dark:border-zinc-800/50 pt-16 pb-4 mt-2">
          <div className="max-w-lg mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="w-10 h-10 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-xl mx-auto md:px-6 px-4 py-2 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-zinc-900/30 rounded-[24px] border border-zinc-200/50 dark:border-zinc-800/50">
              <Skeleton className="w-5 h-5 rounded-full shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-5 w-16 rounded-lg" />
                </div>
                <Skeleton className="h-3 w-3/4" />
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-4 w-12 rounded-md" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!session) { return redirect("/login"); }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <div className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl border-b border-zinc-200/60 dark:border-zinc-800/50 pt-16 pb-4 mt-2">

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
                  <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500">
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

                  <Button
                    onClick={openNewTask}
                    className="w-10 h-10 flex items-center justify-center"
                  >
                    <Plus className="w-6 h-6" strokeWidth={3} />
                  </Button>
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

      <main className="max-w-xl mx-auto md:px-6 px-4 py-3 pb-6 overflow-y-auto h-[calc(100vh-10rem)]">
        <div className="space-y-4">
          {tasks
            .filter(task =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              task.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task) => {
              const now = dayjs();
              const taskDate = dayjs(task.conditionDate);

              let isExecutedInPeriod = false;
              if (task.frequency === 'daily') {
                isExecutedInPeriod = taskDate.isAfter(now, 'day');
              } else if (task.frequency === 'weekly') {
                isExecutedInPeriod = taskDate.isAfter(now, 'week');
              } else if (task.frequency === 'monthly') {
                isExecutedInPeriod = taskDate.isAfter(now, 'month');
              } else if (task.frequency === 'yearly') {
                isExecutedInPeriod = taskDate.isAfter(now, 'year');
              }

              return (
                <div
                  key={task.id}
                  onClick={() => editTask(task)}
                  className="group relative bg-white dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-[24px] transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/30 active:scale-[0.98] cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 transition-transform group-hover:scale-110 mt-0.5 ${task.status === 'completed'
                      ? 'text-emerald-500'
                      : isExecutedInPeriod
                        ? 'text-primary'
                        : 'text-zinc-300 dark:text-zinc-700'
                      }`}>
                      {task.status === 'completed' || isExecutedInPeriod ? (
                        <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                      ) : (
                        <Clock className="w-6 h-6" strokeWidth={2.5} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className={`text-base font-bold leading-tight ${task.status === 'completed'
                              ? 'text-zinc-400 dark:text-zinc-500 line-through'
                              : 'text-zinc-900 dark:text-zinc-100'
                              }`}>
                              {task.title}
                            </h3>
                            {isExecutedInPeriod && task.status !== 'completed' && (
                              <div className="flex items-center gap-1 mt-1">
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                                  <CheckCircle2 className="w-3 h-3 text-primary dark:text-primary" strokeWidth={2.5} />
                                  <span className="text-[9px] font-black text-primary dark:text-primary uppercase tracking-wider">
                                    Ejecutado {
                                      task.frequency === 'daily' ? 'hoy' :
                                        task.frequency === 'weekly' ? 'esta semana' :
                                          task.frequency === 'monthly' ? 'este mes' :
                                            task.frequency === 'yearly' ? 'este año' : ''
                                    }
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          {task.amount > 0 && (
                            <div className={`${task.category.typeId === 1
                              ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20 dark:border-emerald-500/30' :
                              task.category.typeId === 3
                                ? 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30'
                                : 'bg-red-500/10 dark:bg-red-500/20 border-red-500/20 dark:border-red-500/30'
                              } shrink-0 flex items-center px-2.5 py-1 rounded-lg border `}>
                              <DollarSign className={`w-3 h-3 mr-0.5 ${task.category.typeId === 1
                                ? 'text-emerald-500 dark:text-emerald-400' :
                                task.category.typeId === 3
                                  ? 'text-blue-500 dark:text-blue-400'
                                  : 'text-red-500 dark:text-red-400'
                                }`} strokeWidth={2.5} />
                              <span className={`text-[11px] font-black ${task.category.typeId === 1
                                ? 'text-emerald-500 dark:text-emerald-400' :
                                task.category.typeId === 3
                                  ? 'text-blue-500 dark:text-blue-400'
                                  : 'text-red-500 dark:text-red-400'
                                }`}>
                                {task.amount.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>

                        {task.description && (
                          <p className="text-zinc-500 dark:text-zinc-400 text-[13px] leading-snug line-clamp-2 font-medium">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] uppercase tracking-widest font-black px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                              {task.type}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" strokeWidth={2.5} />
                                {task.hour}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" strokeWidth={2.5} />
                                <span>{dayjs(task.conditionDate).format('DD MMM')}</span>
                              </div>
                              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" strokeWidth={2.5} />
                                <span>{task.frequency}</span>
                              </div>
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
                </div>
              );
            })}
        </div>

      </main>

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
