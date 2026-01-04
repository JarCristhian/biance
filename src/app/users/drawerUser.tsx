"use client";
import { UserService } from "./services/api";
import { useEffect, useState } from "react";
import { StoreUser } from "./interfaces";
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
import { User, Mail, Shield, Image, Lock, UserPlus, UserRoundPen } from "lucide-react";

interface Props {
  show: boolean;
  onClose: () => void;
  onUpdate: (user: StoreUser) => void;
  data: StoreUser;
}

export default function DrawerUser({
  show,
  onClose,
  onUpdate,
  data,
}: Props) {
  const { data: session } = useSession();
  const [error, setError] = useState<string>("");
  const userService = new UserService();
  const [form, setForm] = useState<StoreUser>({
    name: "",
    email: "",
    password: "",
    image: "",
    role: "user",
    status: true,
  });

  useEffect(() => { if (data) { setForm(data) } }, [data]);

  const saveUser = async () => {
    if (!form.name) return setError("name"), toast.info("Ingrese el nombre");
    if (!form.email) return setError("email"), toast.info("Ingrese el email");
    if (!form.password && !data.id) return setError("password"), toast.info("Ingrese la contraseña");
    if (!form.role) return setError("role"), toast.info("Ingrese el rol");

    try {
      if (data.id) {
        await userService.updateUser(data.id, form, session?.user.token);
      } else {
        await userService.postUser(form, session?.user.token);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al guardar el usuario");
      return;
    }

    onUpdate({ ...form, id: data.id });

    toast.success(data.id ? "Usuario actualizado" : "Usuario creado");
    close();
  };

  const close = () => {
    onClose();
  };

  return (
    <Drawer open={show} onOpenChange={close}>
      <DrawerContent className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-sm">

          <div className="flex items-center gap-1 mt-2 mx-2">
            <div className="flex items-center p-3 rounded-2xl bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20">
              {data.id ? <UserRoundPen className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>

            <DrawerHeader className="pb-2 text-left -space-y-1.5">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {data.id ? "Editar Usuario" : "Nuevo Usuario"}
                </DrawerTitle>
              </div>
              <DrawerDescription className="text-zinc-500 dark:text-zinc-400">
                {data.id
                  ? "Actualiza la información del perfil del usuario."
                  : "Completa los detalles para crearlo."}
              </DrawerDescription>
            </DrawerHeader>
          </div>

          <div className="p-4 pt-2 space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className={`text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1`}>Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    autoFocus
                    value={form.name}
                    className={`pl-10 ${error === 'name' ? 'border-yellow-500' : ' '}`}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value }), setError("");
                    }}
                    autoComplete="off"
                    placeholder="Ej. John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Rol</label>
                  <Select
                    value={form.role}
                    onValueChange={(val) => setForm({ ...form, role: val })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                      <SelectGroup>
                        <SelectItem value="user">Usuario</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                    <Input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder={data.id ? "••••••••" : "Contraseña"}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 ml-1">URL Imagen de Perfil</label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className={`${data.id ? "" : "opacity-0 hidden"}`}>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Estado de Usuario</span>
                    <span className="text-[10px] text-zinc-500">¿Esta usuario está disponible?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase ${form.status ? 'text-emerald-500' : 'text-zinc-400'}`}>
                      {form.status ? "Activo" : "Inactivo"}
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
          </div>

          <DrawerFooter className="px-6 pb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={close}
                className="flex-1 h-12 rounded-xl font-bold text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all active:scale-95"
              >
                Cancelar
              </button>

              <button
                onClick={saveUser}
                className="flex-2 h-12 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-900/10 dark:shadow-none transition-all active:scale-[0.98] hover:opacity-90"
              >
                {data.id ? "Actualizar" : "Crear Usuario"}
              </button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
