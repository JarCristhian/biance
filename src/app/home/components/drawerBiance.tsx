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
}

export default function DrawerBiance({
  show,
  onClose,
  type
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

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      date: dayjs(daySelected).toDate(),
    }));
  }, [daySelected]);

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
      let data = {
        ...form,
        amount: form.amount,
        category: form.category,
        paymentMethod: +form.paymentMethod,
        type: type,
      };

      const result = await financeService.postFinances(
        data,
        session?.user?.token
      );

      if (result.status !== 500 && result.status !== 400) {
        toast.success("Se ha registrado correctamente..");
        clear();
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } else {
        toast.error("Error al registrar..");
      }
    } catch (error) {
      toast.error("Error al registrar..");
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle
            className={
              "font-bold text-2xl " +
              (type === 1 ? "text-green-500" : "text-red-500")
            }
          >
            {type === 1 ? "Nuevo Ingreso" : "Nuevo Gasto"}
          </DrawerTitle>
          <DrawerDescription>
            Aqui puedes agregar tus finanzas.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto mx-auto w-full max-w-sm px-8 py-4 pb-0">
          <div className="flex flex-col gap-4 items-center justify-center space-x-2">

            <div className="flex flex-col space-y-2 w-full">
              <Select
                defaultValue={form.category?.toString()}
                value={form.category?.toString()}
                onValueChange={(e) => {
                  setForm({ ...form, category: parseInt(e) }), setError("");
                }}
              >
                <SelectTrigger className={`h-11 rounded-xl ${error == "category" ? 'border border-amber-400' : ''}`}>
                  <div className="flex items-center gap-2">
                    <JIcon name="stack" width='w-4' />
                    <SelectValue placeholder="Seleccione" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {category.map((item, index) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Select
                value={form.paymentMethod?.toString()}
                onValueChange={(e) => {
                  setForm({ ...form, paymentMethod: parseInt(e) }),
                    setError("");
                }}
              >
                <SelectTrigger className={`h-11 rounded-xl `}>
                  <div className="flex items-center gap-2">
                    <JIcon name="paymentMethod" width="w-4" />
                    <SelectValue placeholder="Seleccione" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem key={1} value={(1).toString()}>
                      Efectivo
                    </SelectItem>
                    <SelectItem key={2} value={(2).toString()}>
                      Transferencia
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <Input
                className={`h-11 rounded-xl ${error == "amount" ? 'border border-amber-400' : ''}`}
                type="number"
                value={form.amount}
                onChange={(e) => {
                  setForm({ ...form, amount: e.target.value }), setError("");
                }}
                autoComplete="off"
                placeholder="$ 0.00"
              />
            </div>

            <div className="w-full">
              <Input
                className={`h-11 rounded-xl ${error == "description" ? 'border border-amber-400' : ''}`}
                value={form.description}
                onChange={(e) => {
                  setForm({ ...form, description: e.target.value }),
                    setError("");
                }}
                autoComplete="off"
                placeholder="Descripción..."
              />
            </div>

            <div className="flex justify-center items-center w-full px-4 mt-2">
              <Calendar
                className="w-full"
                mode="single"
                selected={new Date(form.date)}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setForm({ ...form, date: date as Date });
                }}
              />
            </div>
          </div>
        </div>

        <DrawerFooter className="px-6">
          <hr className="mb-2" />

          <div className="mx-auto w-full max-w-xs">
            <div className="flex items-center gap-3">
              <div
                onClick={close}
                className="flex items-center gap-1 justify-center text-zinc-800 hover:bg-zinc-100/50 active:bg-zinc-100/50 dark:text-white hover:dark:bg-zinc-800/70 active:dark:bg-zinc-900/20 active:scale-90 cursor-pointer duration-200 rounded-xl py-2 px-6"
              >
                Cancelar
              </div>

              <div
                onClick={saveFinance}
                className="flex-1 items-center justify-center text-center content-center text-lg h-12 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg shadow-zinc-900/10 dark:shadow-none transition-all active:scale-95"
              >
                {loading && <Spinner />}
                Guardar
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
