"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/me/dropdown";
import Image from "next/image";
import picachu from "../../../public/img/picachu.jpg";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { ColorPicker } from "@/components/me/colorPicker";
import { toast } from "sonner";
import useSocket from "@/hooks/useWebsocket";
import { useGlobalStore } from "@/hooks/useGlobalStore";
import { TaskService } from "@/app/tasks/services/api";

export function NavBar() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [show, setShow] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>("");
  const { newNotification } = useSocket();
  const { setRefreshFinance } = useGlobalStore();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const notificationService = new TaskService();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Buenos días");
    } else if (hour < 18) {
      setGreeting("Buenas tardes");
    } else {
      setGreeting("Buenas noches");
    }
  }, []);

  useEffect(() => {
    const token = (session as any)?.token || (session as any)?.user?.token || (session as any)?.accessToken;
    if (token) {
      fetchNotifications(token);
    }
  }, [session]);

  useEffect(() => {
    if (newNotification) {
      toast.success(newNotification.title, {
        description: newNotification.description,
      });
      const token = (session as any)?.token || (session as any)?.user?.token || (session as any)?.accessToken;
      if (token) {
        fetchNotifications(token);
      }
      setTimeout(() => {
        setRefreshFinance();
      }, 1000);
    }
  }, [newNotification]);

  const fetchNotifications = async (token: string) => {
    try {
      const response = await notificationService.getNotifications(token);
      setNotifications(response.data || []);
      const unread = response.data?.filter((n: any) => n.status === 'unread').length || 0;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const token = (session as any)?.token || (session as any)?.user?.token || (session as any)?.accessToken;
    if (!token) return;

    try {
      await notificationService.markAllAsRead(token);
      fetchNotifications(token);
      toast.success("Todas las notificaciones marcadas como leídas");
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };


  if (session) {
    let userT: any;
    if (session.user.user.image == "") {
      userT = picachu;
    }

    return (
      <div className="relative select-none cursor-pointer flex justify-center">
        <Toaster position="top-center" duration={1000} richColors />
        <div className="flex justify-between items-center fixed z-10 top-2 w-96 h-10 rounded-md py-5.5 px-4 drop-shadow-md  bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center group px-1 gap-2 cursor-pointer rounded-sm hover:bg-gray-100/50 active:bg-gray-100/50 hover:dark:bg-zinc-700/70 active:dark:bg-zinc-800/90 active:scale-90 duration-200">
                  <Image
                    className="w-6 h-6 rounded-full group-hover:animate-spin"
                    src={userT}
                    alt=""
                    unoptimized={true}
                    priority={true}
                  />
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col -space-y-1">
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        {session.user.user.name}
                      </span>
                      <span className="text-[11px] opacity-50">{greeting}</span>
                    </div>
                    <div className="w-5 h-5 opacity-40 mt-1">
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
                alignOffset={14}
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
                    <span className="text-xs ml-1 my-1.5 md:my-0 line-through">Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-sm"
                  >
                    <div className="w-3.5 h-3.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.75 2.25a.75.75 0 0 1 .75.75v4A.75.75 0 0 1 13 7V5.75H3a.75.75 0 0 1 0-1.5h10V3a.75.75 0 0 1 .75-.75M17.25 5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75m-6.5 4.25a.75.75 0 0 1 .75.75v1.25H21a.75.75 0 0 1 0 1.5h-9.5V14a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75M2.25 12a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75m11.5 4.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-1.25H3a.75.75 0 0 1 0-1.5h10V17a.75.75 0 0 1 .75-.75m3.5 2.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75"></path></svg>

                    </div>
                    <span className="text-xs ml-1 my-1.5 md:my-0 line-through">Ajustes</span>
                  </DropdownMenuItem>

                  <hr className="my-1" />
                  <DropdownMenuItem
                    className="cursor-pointer text-sm"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    <div className="w-3 h-3">
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
                    <span className="text-xs ml-1 my-1.5 md:my-0">Cerrar Sesion</span>
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

            <ColorPicker />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative flex items-center cursor-pointer p-1 rounded-md hover:bg-gray-100/50 hover:dark:bg-zinc-700/70 active:scale-90 duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.8 25.8 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z"></path><path strokeLinecap="round" d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"></path></g></svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[9px] font-black bg-primary/70 rounded-full">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-80"
                align="end"
                sideOffset={14}
                alignOffset={-47}
              >
                <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Notificaciones</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Marcar como leídas
                    </button>
                  )}
                </div>
                <DropdownMenuGroup className="flex flex-col gap-1 overflow-y-auto max-h-96 p-2">
                  {notifications.length === 0 ? (
                    <p className="text-center text-sm opacity-50 py-20">Sin notificaciones</p>
                  ) : (
                    notifications.map((notification: any) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${notification.status === 'unread'
                          ? 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900'
                          : 'bg-zinc-50 dark:bg-zinc-900/50 border border-transparent'
                          } hover:bg-zinc-100 dark:hover:bg-zinc-800/50`}
                      >
                        <div className="flex items-start gap-2">
                          {notification.status === 'unread' && (
                            <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
                              {notification.title}
                            </h4>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                              {notification.description}
                            </p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
                              {new Date(notification.createdAt).toLocaleString('es-ES', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer p-1 rounded-md hover:bg-gray-100/50 hover:dark:bg-zinc-700/70 active:scale-90 duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 5h10M4 12h16M4 19h10"></path></svg>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-12"
                align="end"
                sideOffset={14}
                alignOffset={-16}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className={
                      pathname == "/"
                        ? "font-semibold dark:text-zinc-200 cursor-pointer"
                        : "hover:font-semibold dark:text-zinc-400 hover:dark:text-zinc-200 cursor-pointer"
                    }
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    <div className="w-4 h-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M39.523 23.115v-4.4a1.003 1.003 0 0 0-1.004-1.003H9.553" strokeWidth={1}></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.705 14.2h-4.95A2.254 2.254 0 0 0 5.5 16.454h0v24.022a1.93 1.93 0 0 0 1.93 1.93h30.162a1.93 1.93 0 0 0 1.93-1.93v-4.44m2.978 3.93V16.98a2.78 2.78 0 0 0-2.78-2.78h-1.65" strokeWidth={1}></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M35.512 33.423a3.843 3.843 0 0 1 0-7.687m0 7.687h4l2.955-1.817m-6.955-5.87h4l2.955-1.816m-5.285-6.39l-2.377-6.134l-15.424 6.226m12.882-5.46l-4.984-6.568l-16.076 11.902" strokeWidth={1}></path><circle cx={35.161} cy={29.579} r={0.634} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}></circle></svg>
                    </div>
                    <span className="text-xs ml-1 my-1.5 md:my-0">Finanzas</span>
                  </DropdownMenuItem>
                  <hr className="my-1" />
                  <DropdownMenuItem
                    className={
                      pathname == "/category"
                        ? "font-semibold dark:text-zinc-200 cursor-pointer"
                        : "hover:font-semibold dark:text-zinc-400 hover:dark:text-zinc-200 cursor-pointer"
                    }
                    onClick={() => {
                      router.push("/category");
                    }}
                  >
                    <div className="w-3.5 h-3.5 opacity-60">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M229.18 173a6 6 0 0 1-2.16 8.2l-96 56a6 6 0 0 1-6 0l-96-56a6 6 0 0 1 6-10.36l93 54.23l93-54.23a6 6 0 0 1 8.16 2.16M221 122.82l-93 54.23l-93-54.23a6 6 0 0 0-6 10.36l96 56a6 6 0 0 0 6 0l96-56a6 6 0 0 0-6-10.36M26 80a6 6 0 0 1 3-5.18l96-56a6 6 0 0 1 6 0l96 56a6 6 0 0 1 0 10.36l-96 56a6 6 0 0 1-6 0l-96-56A6 6 0 0 1 26 80m17.91 0L128 129.05L212.09 80L128 31Z"></path></svg>
                    </div>
                    <span className="text-xs ml-1 my-1.5 md:my-0">Categorias</span>
                  </DropdownMenuItem>
                  <hr className="my-1" />
                  <DropdownMenuItem
                    className={
                      pathname == "/graphics"
                        ? "font-semibold dark:text-zinc-200 cursor-pointer"
                        : "hover:font-semibold dark:text-zinc-400 hover:dark:text-zinc-200 cursor-pointer"
                    }
                    onClick={() => {
                      router.push("/graphics");
                    }}
                  >
                    <div className="w-3 h-3 opacity-80">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M1.298 3.904a39 39 0 0 0 .222 8.535a.41.41 0 0 0 .82-.016a35 35 0 0 0-.26-8.542a.39.39 0 0 0-.782.023M6.91.516c-1.043 11.648.783 9.191.76 8.839c.232-2.94.238-5.893.018-8.834A.389.389 0 0 0 6.91.516m6.115 2.102a19 19 0 0 0 .094 6.363a.41.41 0 0 0 .82-.028c.251-2.11.205-4.243-.136-6.34a.39.39 0 0 0-.778.005m5.62.848a.41.41 0 1 0 .82-.023c.84-4.242-2.002-4.715-.82.023M1.787 17.508a18.5 18.5 0 0 0 .068 6.025a.41.41 0 0 0 .818 0c.298-2.002.26-4.039-.109-6.029a.39.39 0 1 0-.777.004m5.433-3.726a27.3 27.3 0 0 0 .278 7.276a.41.41 0 0 0 .819-.03a26.4 26.4 0 0 0-.318-7.277a.39.39 0 1 0-.778.03m5.999.305a25.4 25.4 0 0 0 .13 7.677a.41.41 0 1 0 .819-.058a39.6 39.6 0 0 0-.173-7.636a.39.39 0 0 0-.777.018m5.746-4.219a95 95 0 0 0 .103 13.61a.41.41 0 0 0 .82 0a88.4 88.4 0 0 0-.141-13.613a.391.391 0 0 0-.78.003z"></path><path d="M20.21 7.167a23 23 0 0 0-1.601-.132a.394.394 0 1 1-.018-.787a32 32 0 0 1 4.726-.186c.914-.004.73 1.44.477 3.412a52 52 0 0 0-.215 1.872a.41.41 0 1 1-.82 0c-.095-1.457-.083-1.976-.07-2.603c.006-.196.01-.402.012-.652c-.286.22-.665.502-1.164.873c-.902.67-2.195 1.632-4.026 3.038c-2.774 2.13-3.62 3.211-4.271 3.104c-.556-.09-.97-1.047-2.317-2.955c-3.555 2.49-5.13 3.518-6.652 4.51c-1.043.68-2.062 1.345-3.677 2.453a.39.39 0 0 1-.456-.63a215 215 0 0 1 6.736-5.002c2.767-1.981 3.67-2.936 4.339-2.793c.577.123.98 1.069 2.262 2.884c3.107-2.459 5.307-3.917 8.663-6.143l.155-.103c-.88-.032-1.498-.098-2.084-.16"></path></g></svg>
                    </div>
                    <span className="text-xs ml-1 my-1.5 md:my-0">Graficos</span>
                  </DropdownMenuItem>
                  <hr className="my-1" />
                  <DropdownMenuItem
                    className={
                      pathname == "/tasks"
                        ? "font-semibold dark:text-zinc-200 cursor-pointer"
                        : "hover:font-semibold dark:text-zinc-400 hover:dark:text-zinc-200 cursor-pointer"
                    }
                    onClick={() => {
                      router.push("/tasks");
                    }}
                  >
                    <div className="w-3.5 h-3.5 opacity-55">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M7.5 6V1m10 5V1m4 16v4.5h-18v-3m17.863-10H3.352M.5 18.25v.25h17.9l.15-.25l.234-.491A28 28 0 0 0 21.5 5.729V3.5h-18v2.128A28 28 0 0 1 .743 17.744z" strokeWidth={1}></path></svg>
                    </div>
                    <span className="text-xs ml-1 my-1.5 md:my-0">Tareas</span>
                  </DropdownMenuItem>

                  {session.user.user.role === "admin" && (
                    <>
                      <hr className="my-1" />
                      <DropdownMenuItem
                        className={
                          pathname == "/users"
                            ? "font-semibold dark:text-zinc-200 cursor-pointer"
                            : "hover:font-semibold dark:text-zinc-400 hover:dark:text-zinc-200 cursor-pointer"
                        }
                        onClick={() => {
                          router.push("/users");
                        }}
                      >
                        <div className="w-3.5 h-3.5 opacity-60">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 19.75c0-2.09-1.67-5.068-4-5.727m-2 5.727c0-2.651-2.686-6-6-6s-6 3.349-6 6m9-12.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m3 3a3 3 0 1 0 0-6"></path></svg>
                        </div>
                        <span className="text-xs ml-1 my-1.5 md:my-0">Usuarios</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }
}
