import JIcon from "@/components/me/jicon";
interface Props {
  onOpen: (type: number) => void;
}
export function Menu({ onOpen }: Props) {
  return (
    <div className="relative select-none cursor-pointer flex justify-center">
      <div className="flex items-center justify-between fixed z-10 bottom-7 group w-80 h-12 rounded-md py-2 px-4 drop-shadow-md bg-white dark:bg-zinc-900">
        <div className="text-xl font-semibold">Biance</div>
        <div className="flex gap-1">
          <div
            onClick={() => onOpen(1)}
            className="flex items-center justify-center text-green-500 hover:bg-green-100/50 active:bg-green-100/50 hover:dark:bg-green-900/20 active:dark:bg-green-900/20 active:scale-90 duration-200 rounded-2xl py-1.5 px-4"
          >
            <JIcon name="down" width="w-4 h-4 mr-1" />
            <div>Ingreso</div>
          </div>

          <div
            onClick={() => onOpen(2)}
            className="flex items-center justify-center text-red-500 hover:bg-red-100/50 active:bg-red-100/50 hover:dark:bg-red-900/20 active:dark:bg-red-900/20 active:scale-90 duration-200 rounded-2xl py-1.5 px-4"
          >
            <JIcon name="down" width="w-4 h-4 rotate-180 mr-1" />
            Gasto
          </div>
        </div>
      </div>
    </div>
  );
}
