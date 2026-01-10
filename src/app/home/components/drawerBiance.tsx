"use client";
import { FinanceService } from "../services/api";
import { useEffect, useState } from "react";
import { GetCategory, StoreFinance } from "../interfaces";
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
import { Spinner } from "@/components/ui/spinner";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import JIcon from "@/components/me/jicon";
import { toast } from "sonner";
import { useGlobalStore } from "@/store/globalState";

interface Props {
  show: boolean;
  type: number;
  onClose: () => void;
  data: StoreFinance;
}

export default function DrawerBiance({
  show,
  onClose,
  type,
  data
}: Props) {
  const { data: session } = useSession();
  const financeService = new FinanceService();
  const [instance, setInstance] = useState<GetCategory[]>([]);
  const [category, setCategories] = useState<GetCategory[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setRefreshFinance, daySelected } = useGlobalStore();

  const [form, setForm] = useState<StoreFinance>({
    amount: "",
    description: "",
    paymentMethod: 1,
    category: null,
    date: dayjs(daySelected).toDate(),
    type,
  });

  useEffect(() => {
    const getCategories = async () => {
      setInstance([]);
      const response = await financeService.getCategories(session?.user?.token);
      // console.log(response);

      if (response.data.length !== 0) {
        setInstance(response.data);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    filterCategory(instance);
    setForm((prevState) => ({
      ...prevState,
      date: dayjs(daySelected).toDate(),
    }));
  }, [type]);

  useEffect(() => { if (data) { setForm(prev => ({ ...prev, ...data, date: dayjs(daySelected).toDate(), })); } }, [data, daySelected]);

  const filterCategory = (data: GetCategory[]) => {
    const category = data.filter((item) => item.type === type);
    setCategories(category);
    setForm({
      ...form,
      category: category?.length > 0 ? category[0].id : null,
    });
  };

  const saveFinance = async () => {
    if (form.amount == "")
      return setError("amount"), toast.info("Ingresa el Importe");
    if (!form.category)
      return setError("category"), toast.info("Selecciona la categoria");

    try {
      setLoading(true);

      let result: any = {}

      let data = {
        ...form,
        amount: form.amount,
        category: form.category,
        paymentMethod: +form.paymentMethod,
        type: type,
      };

      if (data.id) {
        result = await financeService.updateFinances(data.id, data, session?.user?.token);
      } else {
        result = await financeService.postFinances(data, session?.user?.token);
      }

      if (result.status !== 500 && result.status !== 400) {
        toast.success(data.id ? "Se ha actualizado correctamente.." : "Se ha registrado correctamente..");
        setTimeout(() => { setLoading(false); }, 300);
        if (data.id) { close(); } else { clear(); }
      }
    } catch (error) {
      toast.error(data.id ? "Error al actualizar.." : "Error al registrar..");
    }
  };

  const clear = () => {
    setError("");
    setForm((prevState) => ({
      ...prevState,
      amount: "",
      description: "",
      paymentMethod: 1,
      date: dayjs(daySelected).toDate(),
    }));
  };

  const close = () => {
    setRefreshFinance();
    onClose();
    clear();
  };

  return (
    <Drawer open={show} onOpenChange={close}>
      <DrawerContent
        className="
      h-[100dvh]
      max-h-[100dvh]
      flex
      flex-col
    "
      >
        {/* ===== HEADER ===== */}
        <DrawerHeader className="shrink-0">
          <DrawerTitle
            className={`font-bold text-2xl ${type === 1 ? "text-green-500" : "text-red-500"
              }`}
          >
            {data.id ? "Editar " : "Nuevo "}
            {type === 1 ? "Ingreso" : "Gasto"}
          </DrawerTitle>
          <DrawerDescription>
            Aqui puedes agregar tus finanzas.
          </DrawerDescription>
        </DrawerHeader>

        {/* ===== BODY (SCROLL) ===== */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto w-full max-w-sm px-8 py-4 pb-28">
            <div className="flex flex-col gap-4">

              {/* CATEGORIA */}
              <Select
                value={form.category?.toString()}
                onValueChange={(e) => {
                  setForm({ ...form, category: parseInt(e) });
                  setError("");
                }}
              >
                <SelectTrigger
                  className={`h-11 rounded-xl ${error === "category" ? "border border-amber-400" : ""
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <JIcon name="stack" width="w-4" />
                    <SelectValue placeholder="Seleccione" />
                  </div>
                  <SelectContent>
                    <SelectGroup>
                      {category.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </SelectTrigger>
              </Select>

              {/* METODO DE PAGO */}
              <Select
                value={form.paymentMethod?.toString()}
                onValueChange={(e) => {
                  setForm({ ...form, paymentMethod: parseInt(e) });
                  setError("");
                }}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <div className="flex items-center gap-2">
                    <JIcon name="paymentMethod" width="w-4" />
                    <SelectValue placeholder="Seleccione" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Efectivo</SelectItem>
                    <SelectItem value="2">Transferencia</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* MONTO */}
              <Input
                type="number"
                className={`h-11 rounded-xl ${error === "amount" ? "border border-amber-400" : ""
                  }`}
                value={form.amount}
                placeholder="$ 0.00"
                autoComplete="off"
                onFocus={(e) =>
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }
                onChange={(e) => {
                  setForm({ ...form, amount: e.target.value });
                  setError("");
                }}
              />

              {/* DESCRIPCIÓN */}
              <Input
                className={`h-11 rounded-xl ${error === "description" ? "border border-amber-400" : ""
                  }`}
                value={form.description}
                placeholder="Descripción..."
                autoComplete="off"
                onFocus={(e) =>
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }
                onChange={(e) => {
                  setForm({ ...form, description: e.target.value });
                  setError("");
                }}
              />

              {/* CALENDARIO */}
              <div className="w-full mt-2">
                <Calendar
                  className="w-full"
                  mode="single"
                  selected={new Date(form.date)}
                  captionLayout="dropdown"
                  onSelect={(date) =>
                    setForm({ ...form, date: date as Date })
                  }
                />
              </div>

            </div>
          </div>
        </div>

        {/* ===== FOOTER FIJO ===== */}
        <DrawerFooter
          className="
        sticky
        bottom-0
        shrink-0
        bg-background
        border-t
        px-6
        pb-safe
      "
        >
          <div className="mx-auto w-full max-w-xs">
            <div className="flex gap-3">
              <button
                onClick={close}
                className="
              px-6 py-2
              rounded-xl
              text-zinc-800 dark:text-white
              hover:bg-zinc-100/50 dark:hover:bg-zinc-800/70
              active:scale-90
              duration-200
            "
              >
                Cancelar
              </button>

              <button
                onClick={saveFinance}
                className="
              flex-1 h-12
              rounded-xl
              font-bold text-lg
              bg-zinc-900 dark:bg-zinc-100
              text-white dark:text-zinc-900
              active:scale-95
              shadow
            "
              >
                {loading && <Spinner />}
                Guardar
              </button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  );
}
