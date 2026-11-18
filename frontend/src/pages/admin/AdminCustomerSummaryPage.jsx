import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { useMe } from "../../hooks/useMe";
import AdminHeader from "../../components/AdminHeader";
import admin from "../../style/admin.module.css";

function AdminCustomerSummaryPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const { me, roleLabel, logout } = useMe();

  useEffect(() => {
    fetch(`/api/customers/${id}/summary`)
      .then((res) => res.json())
      .then((data) => setCustomer(data));
  }, [id]);

  if (me === null || customer === null) return null;

  return (
    <>
      <AdminHeader roleLabel={roleLabel} onLogout={logout} />

      <main className={admin.main}>
        <h2 className={admin.title}>お客様情報</h2>

        <table className={admin.table}>
          <tbody>
            <tr>
              <th>氏名</th>
              <td>{customer.name}様</td>
            </tr>
            <tr>
              <th>住所</th>
              <td>{customer.address}</td>
            </tr>
            <tr>
              <th>建築区分</th>
              <td>{customer.buildType || "-"}</td>
            </tr>
            <tr>
              <th>建築時期</th>
              <td>{customer.buildTiming || "-"}</td>
            </tr>
            <tr>
              <th>建築予定地</th>
              <td>{customer.buildArea || "-"}</td>
            </tr>
            <tr>
              <th>来場動機</th>
              <td>{customer.visitReason || "-"}</td>
            </tr>
          </tbody>
        </table>

        <Link to="/admin/reservations" className={admin.backLink}>
          予約一覧へ戻る
        </Link>
      </main>
    </>
  );
}

export default AdminCustomerSummaryPage;
