"use client";
import { CategoryService } from "./services/api";
import { useEffect, useState } from "react";
import { StoreCategory } from "./interfaces";
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
import { Tag, ArrowUpCircle, ArrowDownCircle, PackagePlus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/me/button";

interface Props {
  show: boolean;
  onClose: () => void;
  onUpdate: () => void;
  data: StoreCategory;
}

export default function DrawerCategory({
  show,
  onClose,
  onUpdate,
  data,
}: Props) {
  const { data: session } = useSession();
  const categoryService = new CategoryService();
  const [, setError] = useState<string>("");
  const [form, setForm] = useState<StoreCategory>({
    name: "",
    typeId: 1,
    status: true,
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const saveCategory = async () => {
    if (!form.name) return setError("name"), toast.info("Ingrese el nombre");

    try {
      let result;
      if (data.id) {
        result = await categoryService.updateCategory(
          data.id,
          form,
          session?.user?.token
        );
      } else {
        result = await categoryService.postCategory(form, session?.user?.token);
      }

      if (result.status !== 500 && result.status !== 400) {
        toast.success(data.id ? "Categoría actualizada" : "Categoría creada");
        close();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const close = () => {
    onUpdate();
    onClose();
  };

  return (
    <Drawer open={show} onOpenChange={onClose}>
      <DrawerContent className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-sm">

          <div className="flex items-center gap-1 mt-2 mx-2">
            <div className="flex items-center p-3 rounded-2xl bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20">
              {data.id ? <RefreshCcw className="w-5 h-5" /> : <PackagePlus className="w-5 h-5" />}
            </div>

            <DrawerHeader className="pb-2 text-left -space-y-1.5">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {data.id ? "Editar Categoría" : "Nueva Categoría"}
                </DrawerTitle>
              </div>
              <DrawerDescription className="text-zinc-500 dark:text-zinc-400">
                {data.id
                  ? "Modifica los detalles de tu categoría."
                  : "Crea una nueva clasificación para tus finanzas."}
              </DrawerDescription>
            </DrawerHeader>
          </div>

          <div className="p-4 pt-2 space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Nombre</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    autoFocus
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value }), setError("");
                    }}
                    autoComplete="off"
                    placeholder="Ej. Alimentación, Sueldo..."
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Tipo de Movimiento</label>
                <Select
                  value={form.typeId?.toString()}
                  onValueChange={(val) => setForm({ ...form, typeId: parseInt(val) })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <SelectGroup>
                      <SelectItem value="1">
                        <div className="flex items-center gap-2">
                          <ArrowUpCircle className="w-4 h-4 text-emerald-500" />
                          <span>Ingreso</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="2">
                        <div className="flex items-center gap-2">
                          <ArrowDownCircle className="w-4 h-4 text-rose-500" />
                          <span>Gasto</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="3">
                        <div className="flex items-center gap-2">
                          <ArrowDownCircle className="w-4 h-4 text-blue-500" />
                          <span>Ahorro</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Estado de Categoría</span>
                  <span className="text-[10px] text-zinc-500">¿Esta categoría está disponible?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase ${form.status ? 'text-emerald-500' : 'text-zinc-400'}`}>
                    {form.status ? "Activa" : "Inactiva"}
                  </span>
                  <input
                    type="checkbox"
                    checked={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.checked })}
                    className="w-5 h-5 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="px-6 pb-8 mt-2">
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-12 rounded-xl font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all active:scale-95"
              >
                Cancelar
              </button>

              <Button
                onClick={saveCategory}
                className="flex-2 h-12"
              >
                {data.id ? "Actualizar" : "Crear Categoría"}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
