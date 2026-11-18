import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import AdminHeader from "../../components/AdminHeader";
import styles from "./AdminMenuPage.module.css";

function AdminMenuPage() {
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMe = async () => {
      const res = await fetch("/api/me");

      if (!res.ok) {
        navigate("/admin/login");
        return;
      }

      const data = await res.json();
      setMe(data);
    };

    loadMe();
  }, []);

  if (me === null) {
    return null;
  }

  const roleLabel = me.role === "管理職" ? "管理職" : "スタッフ";

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <AdminHeader roleLabel={roleLabel} onLogout={handleLogout} />

      <main className={styles.main}>
        <h2 className={styles.title}>メニュー</h2>

        <div className={styles.cards}>
          <Link to="/admin/reservations" className={styles.card}>
            <h3 className={styles.cardTitle}>予約一覧</h3>
            <p className={styles.cardText}>日ごとの予約状況を確認する</p>
          </Link>

          {me.role === "管理職" && (
            <Link to="/admin/customers" className={styles.card}>
              <h3 className={styles.cardTitle}>顧客一覧</h3>
              <p className={styles.cardText}>顧客情報の確認・編集・削除</p>
            </Link>
          )}

          <Link to="/admin/customers/new" className={styles.card}>
            <h3 className={styles.cardTitle}>顧客登録</h3>
            <p className={styles.cardText}>新しく顧客を登録する</p>
          </Link>
        </div>
      </main>
    </>
  );
}

export default AdminMenuPage;
