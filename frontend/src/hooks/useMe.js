import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useMe() {
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMe = async () => {
      const res = await fetch("/api/me");

      if (!res.ok) {
        navigate("/admin/login", { replace: true });
        return;
      }

      const data = await res.json();
      setMe(data);
    };

    loadMe();
  }, [navigate]);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    navigate("/admin/login", { replace: true });
  };

  const roleLabel = me?.role === "管理職" ? "管理職" : "スタッフ";

  return { me, roleLabel, logout };
}
