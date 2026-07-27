import { useEffect, useState, createContext } from "react";
import { getAdmin, loginRequest, logoutRequest } from "../services/auth";
import { toast } from "react-toastify";

export  const AuthContext = createContext();

const AUTH_STATUS = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(() => {
    return localStorage.getItem("token") ? AUTH_STATUS.LOADING : AUTH_STATUS.UNAUTHENTICATED;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getAdmin()
      .then((res) => {
        if (res.success) {
          setUser(res.user);
          setStatus(AUTH_STATUS.AUTHENTICATED);
        } else if (res.message === "Not authorized, token failed") {
          toast.error(res.message);
          localStorage.removeItem("token");
          setUser(null);
          setStatus(AUTH_STATUS.UNAUTHENTICATED);
        } else {
          setUser(null);
          toast.error(res.message);
        }
      })
      .catch(() => {
        setUser(null);
        setStatus(AUTH_STATUS.UNAUTHENTICATED);
      });
  }, []);

  const login = async (email, password) => {
    const res = await loginRequest(email, password);
    const { token, ...data } = res;

    if (res.success) {
      localStorage.setItem("token", token);
      setUser(res.user);
      setStatus(AUTH_STATUS.AUTHENTICATED);
    }
    return data;
  };

  const logout = async () => {
    const res = await logoutRequest();
    localStorage.removeItem("token");
    setStatus(AUTH_STATUS.UNAUTHENTICATED);
    setUser(null);
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, status }}>
      {children}
    </AuthContext.Provider>
  );
}