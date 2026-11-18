import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMe } from "../../hooks/useMe";
import AdminHeader from "../../components/AdminHeader";
import admin from "../../style/admin.module.css";

function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const { me, roleLabel, logout } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomers = async () => {
      const res = await fetch("/api/customers");

      if (res.status === 403) {
        navigate("/admin", { replace: true });
        return;
      }

      const data = await res.json();
      setCustomers(data);
    };

    loadCustomers();
  }, [navigate]);

  if (me === null) {
    return null;
  }

  return (
    <>
      <AdminHeader roleLabel={roleLabel} onLogout={logout} />

      <main className={admin.main}>
        <h2 className={admin.title}>顧客一覧</h2>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>氏名</th>
              <th>住所</th>
              <th>電話番号</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((r) => (
              <tr key={r.customerId}>
                <td>{r.customerId}</td>
                <td>{r.name}</td>
                <td>{r.address}</td>
                <td>{r.phone}</td>
                <td className={admin.right}>
                  <Link
                    to={`/admin/customers/${r.customerId}`}
                    className={admin.detailLink}
                  >
                    詳細 ›
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/admin" className={admin.backLink}>
          管理者画面へ戻る
        </Link>
      </main>
    </>
  );
}

export default AdminCustomersPage;
