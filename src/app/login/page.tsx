"use client";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Languages } from "../api/config";

interface User {
  name: string;
  email: string;
  password: string;
}

function Login() {
  const languages = new Languages();
  const { English, Spanish, language } = languages;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<boolean>(false);
  const router = useRouter();
  const [lang, setLang] = useState<boolean | null>(false);

  useEffect(() => {
    setLang(languages.getLanguage());
  }, [language]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let message = "";

    if (email.trim().length === 0 && password.trim().length === 0) {
      message = lang ? "Add your Credentials" : "Ingresa tus Credenciales.";
    } else if (email.trim().length === 0) {
      message = lang ? English.ErrorEmail : Spanish.ErrorEmail;
    } else if (password.trim().length === 0) {
      message = lang ? English.ErrorPass : Spanish.ErrorPass;
    }

    if (message != "") {
      toast.error(message);
      return;
    }
    setLoading(true);
    const responseNextAuth = await signIn("credentials", {
      email: email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (responseNextAuth?.error) {
      toast.error("Tu Usuario es incorrecto.");
      return;
    } else {
      router.push("/");
      setSession(true);
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --cyber-bg: #000000;
          --cyber-primary: #ffffff;
          --cyber-secondary: #888888;
          --cyber-panel: rgba(5, 5, 5, 0.95);
        }

        body {
          margin: 0;
          padding: 0;
        }

        .cyber-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
          mask-image: radial-gradient(circle at center, black 0%, transparent 90%);
        }

        .cyber-scanline {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.02) 50%,
            transparent
          );
          background-size: 100% 2px;
          z-index: 1;
          pointer-events: none;
        }

        .cyber-panel {
          background: var(--cyber-panel);
          border: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
          width: 100%;
          max-width: 360px; /* Mobile width */
          margin: auto;
          clip-path: polygon(
            0 15px, 
            15px 0, 
            100% 0, 
            100% calc(100% - 15px), 
            calc(100% - 15px) 100%, 
            0 100%
          );
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
        }

        .cyber-input-wrap {
          position: relative;
          margin-bottom: 24px;
        }

        .cyber-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 12px 16px 40px;
          font-family: 'JetBrains Mono', monospace;
          color: #fff;
          outline: none;
          transition: all 0.3s;
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }

        .cyber-input:focus {
          border-color: #fff;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
        }

        .cyber-label {
          position: absolute;
          left: 40px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.3);
          transition: all 0.2s ease;
          pointer-events: none;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .cyber-input:focus + .cyber-label,
        .cyber-input:not(:placeholder-shown) + .cyber-label {
          top: -10px;
          left: 8px;
          font-size: 9px;
          color: #fff;
          background: #000;
          padding: 0 5px;
        }

        .cyber-btn {
          width: 100%;
          padding: 16px;
          background: #fff;
          border: none;
          color: #000;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          cursor: pointer;
          transition: all 0.3s;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 15px));
        }

        .cyber-btn:hover {
          background: #ccc;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }

        .tech-tag {
          font-size: 8px;
          color: #fff;
          opacity: 0.3;
          letter-spacing: 1.5px;
        }

        .cyber-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <div className="relative flex items-center justify-center w-full min-h-screen px-4">
        <div className="cyber-grid" />
        <div className="cyber-scanline" />

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-[360px]"
          >
            <Toaster position="top-center" duration={1500} richColors />

            <div className="cyber-panel p-8">
              <div className="cyber-corner top-0 left-0 border-r-0 border-b-0" />
              <div className="cyber-corner bottom-0 right-0 border-l-0 border-t-0" />

              <div className="flex justify-between items-center mb-8">
                <span className="tech-tag">USER_LOGIN</span>
                <span className="tech-tag">V4.1_W_O</span>
              </div>

              <div className="text-center mb-10">
                <div className="w-12 h-12 mx-auto mb-4 border border-white/40 flex items-center justify-center text-white text-2xl font-bold"
                  style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}>
                  <img src={'/favicon.ico'} alt="favicon" className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-[0.2em] mb-1">BIANCE</h1>
                <p className="tech-tag">STARK_INTERFACE</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="cyber-input-wrap">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <input
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="cyber-input"
                    autoComplete="off"
                  />
                  <label className="cyber-label">{lang ? English.user : Spanish.user}</label>
                </div>

                <div className="cyber-input-wrap">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </div>
                  <input
                    type={visible ? "password" : "text"}
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cyber-input pr-10"
                    autoComplete="off"
                  />
                  <label className="cyber-label">{lang ? English.pass : Spanish.pass}</label>

                  <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                  >
                    {visible ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 1.24-2.33M4.93 4.93A10.07 10.07 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cyber-btn"
                >
                  {session ? "SUCCESS " : loading ? "PENDING..." : (lang ? "INITIALIZE" : "INICIAR")}
                </button>
              </form>

              <div className="mt-8 flex justify-center gap-4">
                {['GH', 'IG', 'X'].map((s, i) => (
                  <span key={i} className="tech-tag border border-white/10 px-2 py-1">{s}</span>
                ))}
              </div>

              <div className="text-[7px] text-center mt-6 text-white/10 tracking-[3px]">
                JARCY_OS // MOBILE_SYS
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Login;
