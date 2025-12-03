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
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<StoreCategory>({
    name: "",
    typeId: 1,
    status: true,
  });

  useEffect(() => {
    setForm(data);
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
      // console.log(result);

      if (result.status !== 500 && result.status !== 400) {
        if (result.status === 201) {
          toast.success("Se ha registrado correctamente..");
          clear();
        } else if (result.status === 200) {
          toast.success("Se ha guardado correctamente..");
          close();
        }
      } else {
        toast.error("Error al registrar..");
      }
    } catch (error) {
      toast.error("Error al registrar..");
    }
  };

  const clear = () => {
    setForm({
      name: "",
      typeId: 1,
      status: true,
    });
    setError("");
  };

  const close = () => {
    onUpdate();
    onClose();
    clear();
  };

  return (
    <Drawer open={show} onOpenChange={close}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>
              {data.id ? "Editar Categoria" : "Nueva Categoria"}
            </DrawerTitle>
            <DrawerDescription>
              Aqui puedes agregar las categorias.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-8 pb-0">
            <div className="flex flex-col gap-3 items-center justify-center space-x-2">
              <div className="flex flex-col space-y-2 w-full">
                <span className={error == "name" ? "text-amber-400" : ""}>
                  Nombre
                </span>
                <Input
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value }), setError("");
                  }}
                  autoComplete="off"
                  placeholder="Escribe el nombre"
                />
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <span>Tipo</span>
                <Select
                  value={form.typeId?.toString()}
                  onValueChange={(e) => {
                    setForm({
                      ...form,
                      typeId: parseInt(e),
                    }),
                      setError("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem key={1} value={(1).toString()}>
                        Ingreso
                      </SelectItem>
                      <SelectItem key={2} value={(2).toString()}>
                        Gasto
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2 w-full mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="custom-checkbox"
                      type="checkbox"
                      checked={form.status}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          status: e.target.checked,
                        });
                      }}
                      className="w-4.5 h-4.5 rounded bg-gray-500 border-gray-300  dark:bg-zinc-100 dark:border-zinc-600  cursor-pointer"
                    />
                    <label
                      htmlFor="custom-checkbox"
                      className="ml-1 text-sm font-xs text-zinc-700 dark:text-gray-300 cursor-pointer opacity-90"
                    >
                      {form.status ? "Activo" : "Inactivo"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter className="mt-2">
              <hr />
              <div className="flex items-center justify-center gap-4 mt-4">
                <div
                  onClick={close}
                  className="flex items-center gap-1 justify-center text-zinc-800 hover:bg-zinc-100/50 active:bg-zinc-100/50 dark:text-white hover:dark:bg-zinc-800/70 active:dark:bg-zinc-900/20 active:scale-90 cursor-pointer duration-200 rounded-xl py-2 px-6"
                >
                  Cancelar
                </div>

                <div
                  onClick={saveCategory}
                  className="flex items-center gap-1 justify-center font-medium text-white bg-zinc-800 active:bg-zinc-800/70 dark:text-zinc-800 dark:bg-zinc-100 active:dark:bg-zinc-200/80 active:scale-90 cursor-pointer duration-200 rounded-xl py-2 px-8"
                >
                  Guardar
                </div>
              </div>
              {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
