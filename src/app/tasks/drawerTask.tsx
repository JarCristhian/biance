"use client";
// import { TaskService } from "./services/api";
import { useEffect, useState } from "react";
import { StoreTask } from "./interfaces";
import { useSession } from "next-auth/react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/me/drawer";
import { Input } from "@/components/me/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/me/select";
import { toast } from "sonner";
import { Calendar, Clock, DollarSign, Tag, CheckCircle2, CalendarPlus, CalendarSync } from "lucide-react";
import { Button } from "@/components/me/button";

interface Props {
  show: boolean;
  onClose: () => void;
  onUpdate: (task: StoreTask) => void;
  data: StoreTask;
}

export default function DrawerTask({
  show,
  onClose,
  onUpdate,
  data,
}: Props) {
  const { data: session } = useSession();
  // const taskService = new TaskService();
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<StoreTask>({
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

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const saveTask = async () => {
    if (!form.title) return setError("title"), toast.info("Ingrese el título");

    // Pass the form data back to the parent
    onUpdate({
      ...form,
      id: data.id // Preserve ID if editing
    });

    toast.success(data.id ? "Tarea actualizada" : "Tarea guardada");
    close();
  };

  const clear = () => {
    setForm({
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
    setError("");
  };

  const close = () => {
    onClose();
    // Don't clear here if we want to keep state briefly or if parent handles it
  };

  const isReadOnly = data?.status === 'completed';

  return (
    <Drawer open={show} onOpenChange={close}>
      <DrawerContent className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-sm">

          <div className="flex items-center gap-1 mt-2 mx-2">
            {isReadOnly ? (
              <div className="flex items-center p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="flex items-center p-3 rounded-2xl bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20">
                {data.id ? <CalendarSync className="w-5 h-5" /> : <CalendarPlus className="w-5 h-5" />}
              </div>
            )}

            <DrawerHeader className="pb-2 text-left -space-y-1.5">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {data.id ? (isReadOnly ? "Detalles de Tarea" : "Editar Tarea") : "Nueva Tarea"}
                </DrawerTitle>
              </div>
              <DrawerDescription className="text-zinc-500 dark:text-zinc-400">
                {isReadOnly
                  ? "Esta tarea está completada y no se puede editar."
                  : "Completa los detalles de tu tarea a continuación."}
              </DrawerDescription>
            </DrawerHeader>
          </div>

          <div className="p-2 pt-2 space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5 opacity-100 transition-opacity">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Título</label>
                <div className="relative">
                  <Input
                    autoFocus={!isReadOnly}
                    disabled={isReadOnly}
                    value={form.title}
                    onChange={(e) => {
                      setForm({ ...form, title: e.target.value }), setError("");
                    }}
                    autoComplete="off"
                    placeholder="Escribe el título"
                    className={`${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Descripción</label>
                <div className="relative">
                  <textarea
                    disabled={isReadOnly}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Detalles adicionales..."
                    className={`w-full min-h-[80px] px-4 py-3 text-sm rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border  border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-900/40 dark:focus:ring-zinc-200 focus:border-zinc-900/10 dark:focus:border-zinc-100/10 outline-none transition-all resize-none text-zinc-800 dark:text-zinc-200 ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Categoría</label>
                  <Select
                    disabled={isReadOnly}
                    value={form.type}
                    onValueChange={(val) => setForm({ ...form, type: val })}
                  >
                    <SelectTrigger className={`${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                      <SelectGroup>
                        <SelectItem value="Personal">Personal</SelectItem>
                        <SelectItem value="Trabajo">Trabajo</SelectItem>
                        <SelectItem value="Compras">Compras</SelectItem>
                        <SelectItem value="Hogar">Hogar</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Monto</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                    <Input
                      disabled={isReadOnly}
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
                      className={`pl-8 ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Fecha</label>
                  <Input
                    disabled={isReadOnly}
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Hora</label>
                  <Input
                    disabled={isReadOnly}
                    type="time"
                    value={form.hour}
                    onChange={(e) => setForm({ ...form, hour: e.target.value })}
                    className={`${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="px-6">
            <hr className="mt-4 mb-2" />

            <div className="flex items-center gap-3">
              <button
                onClick={close}
                className="flex-1 h-12 rounded-xl font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all active:scale-95"
              >
                {isReadOnly ? "Cerrar" : "Cancelar"}
              </button>

              {!isReadOnly && (
                <Button
                  onClick={saveTask}
                  className="flex-2 h-12 font-bold"
                >
                  Guardar
                </Button>
              )}
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
