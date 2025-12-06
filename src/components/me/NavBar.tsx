"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/me/dropdown";
import Image from "next/image";
import picachu from "../../../src/app/img/picachu.jpg";
import { Toaster } from "sonner";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";

export function NavBar() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [show, setShow] = useState<boolean>(false);

  if (session) {
    let userT: any;
    if (session.user.user.image == "") {
      userT = picachu;
    }

    return (
      <div className="relative select-none cursor-pointer flex justify-center">
        <Toaster position="top-center" duration={1000} richColors />
        <div className="flex justify-between items-center fixed z-10 top-3  w-96 h-10 rounded-md py-2 px-4 drop-shadow-md  bg-white dark:bg-zinc-900">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center group p-1 space-x-1.5 cursor-pointer rounded-sm hover:bg-gray-100/50 active:bg-gray-100/50 hover:dark:bg-zinc-700/70 active:dark:bg-zinc-800/90 active:scale-90 duration-200">
                  <Image
                    className="w-5 h-5 rounded-full group-hover:animate-spin"
                    src={userT}
                    alt=""
                    unoptimized={true}
                    priority={true}
                  />
                  <div className="flex items-center space-x-0.5">
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      {session.user.user.name}
                    </span>
                    <div className="w-4 h-4 opacity-50 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          d="M4.5 6L8 9.5L11.5 6"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-12"
                align="end"
                sideOffset={10}
                alignOffset={1}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer text-sm"
                    onClick={() => {
                      setShow(!show);
                    }}
                  >
                    <div className="w-3.5 h-3.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3m9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-xs ml-1">Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-sm"
                    onClick={() => {
                      router.push("/category");
                    }}
                  >
                    <div className="w-3.5 h-3.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M7.754 1.82a.5.5 0 0 0-.508 0l-5.5 3.25a.5.5 0 0 0 0 .86l5.5 3.25a.5.5 0 0 0 .508 0l5.5-3.25a.5.5 0 0 0 0-.86zM7.5 8.17L2.983 5.5L7.5 2.83l4.517 2.67zm-5.246.15a.5.5 0 0 0-.508.86l5.5 3.25a.5.5 0 0 0 .508 0l5.5-3.25a.5.5 0 1 0-.508-.86L7.5 11.42z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-xs ml-1">Categoria</span>
                  </DropdownMenuItem>

                  {/* <DropdownMenuItem
                  className="cursor-pointer text-sm sm:block md:hidden"
                  onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
                >
                  <div className="flex space-x-3">
                    <div className="w-3 h-3">
                      <MoonIcon className="absolute w-3 h-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <SunIcon className="w-3 h-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    </div>
                    <span className="text-xs ml-1">
                      {language ? English.theme : Spanish.theme}
                    </span>
                  </div>
                </DropdownMenuItem> */}
                  <hr className="my-1" />
                  <DropdownMenuItem
                    className="cursor-pointer text-sm"
                    onClick={() => signOut()}
                  >
                    <div className="w-3.5 h-3.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M6 30h12a2.002 2.002 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2.002 2.002 0 0 0-2-2H6a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6l-1.414-1.414z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-xs ml-1">Cerrar Sesion</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div
              className="flex items-center text-zinc-500 dark:text-zinc-400 justify-center cursor-pointer rounded-full w-5 h-5  hover:bg-gray-100/50 active:bg-gray-100/50 hover:dark:bg-zinc-700/70 active:dark:bg-zinc-800/90 active:scale-90 duration-200"
              onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
            >
              <div className="flex space-x-3">
                {theme == "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12.058 20q-3.333 0-5.667-2.334T4.058 12q0-2.47 1.413-4.535q1.414-2.067 4.01-2.973q.306-.107.536-.056t.381.199t.192.38q.04.233-.063.489q-.194.477-.282.966t-.087 1.03q0 2.667 1.866 4.533t4.534 1.867q.698 0 1.277-.148q.58-.148.988-.24q.218-.04.399.01t.289.176q.118.125.16.308q.04.183-.048.417q-.715 2.45-2.803 4.013T12.058 20m0-1q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.162T9.158 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5.058 12q0 2.9 2.05 4.95t4.95 2.05m-.25-6.75"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="4" strokeLinejoin="round" />
                      <path
                        strokeLinecap="round"
                        d="M20 12h1M3 12h1m8 8v1m0-18v1m5.657 13.657l.707.707M5.636 5.636l.707.707m0 11.314l-.707.707M18.364 5.636l-.707.707"
                      />
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <div
              onClick={() => {
                router.push("/");
              }}
              className={
                pathname == "/"
                  ? "font-semibold dark:text-zinc-200"
                  : "hover:font-semibold hover:dark:text-zinc-200"
              }
            >
              Home
            </div>
            <div
              className={
                pathname == "grafhics"
                  ? "font-semibold dark:text-zinc-200"
                  : "hover:font-semibold hover:dark:text-zinc-200"
              }
            >
              Graficos
            </div>
            <div
              className={
                pathname == "tasks"
                  ? "font-semibold dark:text-zinc-200"
                  : "hover:font-semibold hover:dark:text-zinc-200"
              }
            >
              Tareas
            </div>
          </div>
        </div>
      </div>
    );
  }
}
