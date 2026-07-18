import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const x = useContext(AuthContext);
  if (!x) throw new Error("useAuth must be used inside AuthProvider");
  return x;
}
