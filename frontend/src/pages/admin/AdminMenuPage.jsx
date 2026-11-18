import { Link } from "react-router";
import { useMe } from "../../hooks/useMe.js";
import AdminHeader from "../../components/AdminHeader";
import styles from "./AdminMenuPage.module.css";

function AdminMenuPage() {
  const { me, roleLabel, logout } = useMe();

  if (me === null) {
    return null;
  }

  return (
    <>
      <AdminHeader roleLabel={roleLabel} onLogout={logout} />

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
