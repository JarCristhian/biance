"use client";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import DrawerUser from "./drawerUser";
import { GetUser, StoreUser } from "./interfaces";

import {
  Plus,
  Search,
  ChevronRight,
  ShieldCheck,
  User as UserIcon,
  Mail,
  MoreVertical,
  UserPlus
} from "lucide-react";

const itemVariants: Variants = {
  initial: { opacity: 0, y: 15, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
    transition: { duration: 0.3 }
  }
};

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<GetUser[]>([
    {
      id: 1,
      name: "Jhon Doe",
      email: "john.doe@example.com",
      password: "password123",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      role: "admin",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password123",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      role: "user",
      createdAt: "2026-01-02",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
      id: 3,
      name: "Marcos Doe",
      email: "marcos.doe@example.com",
      password: "password123",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcos",
      role: "user",
      createdAt: "2026-01-03",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
  ]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<StoreUser | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateUser = (userData: StoreUser) => {
    if (userData.id) {
      setUsers(prev => prev.map(u => u.id === userData.id ? { ...u, ...userData } as GetUser : u));
    } else {
      setUsers(prev => {
        const nextId = prev.length > 0 ? Math.max(...prev.map(u => u.id)) + 1 : 1;
        const newUser: GetUser = {
          ...userData as GetUser,
          id: nextId,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString(),
        };
        return [newUser, ...prev];
      });
    }
    setShowDrawer(false);
  };

  const openNewUser = () => {
    setSelectedUser({
      id: 0,
      name: "",
      email: "",
      password: "",
      image: "",
      role: "user",
    });
    setShowDrawer(true);
  };

  const editUser = (user: GetUser) => {
    setSelectedUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
      role: user.role,
    });
    setShowDrawer(true);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-zinc-100 dark:border-zinc-800" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-t-2 border-zinc-900 dark:border-zinc-100 animate-spin" />
        </div>
      </div>
    );
  }

  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <div className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 pt-16 pb-4 mt-2">
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
                    Usuarios
                  </h1>
                  <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500">
                    Gestiona los miembros de tu equipo y sus roles
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSearching(true)}
                    className="w-9 h-9 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all active:scale-95"
                  >
                    <Search className="w-4.5 h-4.5" strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={openNewUser}
                    className="group relative flex items-center gap-2 px-3.5 h-9 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl shadow-xl shadow-zinc-900/10 dark:shadow-none active:scale-[0.98] transition-all hover:opacity-90 overflow-hidden"
                  >
                    <Plus className="w-4 h-4" strokeWidth={3} />
                    <span className="text-xs font-bold">Nuevo</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="search-header"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-3"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre o email..."
                    className="w-full h-11 pl-10 pr-4 bg-zinc-100 dark:bg-zinc-900/80 border border-transparent focus:border-zinc-900/10 dark:focus:border-zinc-100/10 focus:bg-white dark:focus:bg-zinc-900 rounded-xl text-xs font-bold transition-all outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearching(false);
                    setSearchQuery("");
                  }}
                  className="px-3 h-11 text-xs font-black text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-colors"
                >
                  Cancelar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <main className="max-w-xl mx-auto px-6 py-3 pb-32">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid gap-3"
        >
          <AnimatePresence mode="popLayout">
            {users
              .filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <motion.div
                  key={user.id}
                  variants={itemVariants}
                  layout
                  onClick={() => editUser(user)}
                  className="group relative bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 p-2.5 rounded-[20px] transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-[0.99] cursor-pointer hover:shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-[1.5px] border-white dark:border-zinc-800 shadow-sm">
                        {user.image ? (
                          <img src={user.image} alt={user.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-400">
                            <UserIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[1.5px] border-white dark:border-zinc-900 flex items-center justify-center shadow-sm ${user.role === 'admin' ? 'bg-indigo-500' : 'bg-emerald-500'
                        }`}>
                        {user.role === 'admin' ? (
                          <ShieldCheck className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        ) : (
                          <UserIcon className="w-2 h-2 text-white" strokeWidth={3} />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <h3 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-50 truncate">
                              {user.name}
                            </h3>
                            <span className={`shrink-0 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${user.role === 'admin'
                              ? 'bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100/50 dark:border-indigo-500/10'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200/50 dark:border-zinc-700/50'
                              }`}>
                              {user.role}
                            </span>
                          </div>
                          <MoreVertical className="shrink-0 w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-400 transition-colors" />
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-0">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {users.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-[32px] bg-zinc-100 dark:bg-zinc-900 mb-6">
                <UserPlus className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Sin miembros</h3>
              <p className="text-zinc-500 dark:text-zinc-500 max-w-[240px] mx-auto text-sm font-medium">
                Tu comunidad está vacía. Empieza por agregar un nuevo usuario.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>

      {showDrawer && selectedUser && (
        <DrawerUser
          show={showDrawer}
          onUpdate={handleUpdateUser}
          data={selectedUser}
          onClose={() => setShowDrawer(false)}
        />
      )}
    </div>
  );
}
