import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useMe } from "../../hooks/useMe";
import { formatDatetime } from "../../utils/formatDate";
import AdminHeader from "../../components/AdminHeader";
import admin from "../../style/admin.module.css";

function AdminCustomerDetailPage() {
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();
  const { me, roleLabel, logout } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomer = async () => {
      const res = await fetch(`/api/customers/${id}`);

      if (res.status === 403) {
        navigate("/admin", { replace: true });
        return;
      }

      const data = await res.json();
      setCustomer(data);
    };
    loadCustomer();
  }, [navigate, id]);

  const handleDelete = async () => {
    const ok = window.confirm(`${customer.name}様の顧客情報を削除しますか？`);
    if (!ok) return;

    await fetch(`/api/customers/${id}`, { method: "DELETE" });

    navigate("/admin/customers", { replace: true });
  };

  if (me === null || customer === null) {
    return null;
  }

  return (
    <>
      <AdminHeader roleLabel={roleLabel} onLogout={logout} />

      <main className={admin.main}>
        <div className={admin.titleRow}>
          <h2 className={admin.title}>顧客詳細</h2>
          <div className={admin.action}>
            <button type="button" className={admin.outlineButton}>
              編集
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={`${admin.outlineButton} ${admin.dangerButton}`}
            >
              削除
            </button>
          </div>
        </div>

        <div className={admin.columns}>
          <section>
            <h3 className={admin.subTitle}>顧客情報・アンケート</h3>
            <table className={admin.table}>
              <tbody>
                <tr>
                  <th>氏名</th>
                  <td>{customer.name}</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>{customer.address}</td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>{customer.phone}</td>
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
                <tr>
                  <th>来場日時</th>

                  <td>
                    {customer.visitDatetime
                      ? formatDatetime(customer.visitDatetime)
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3 className={admin.subTitle}>見学記録（表示のみ）</h3>
            {customer.records.length === 0 ? (
              <p className={admin.empty}>見学記録はありません</p>
            ) : (
              <table className={admin.table}>
                <thead>
                  <tr>
                    <th>住宅</th>
                    <th className={admin.center}>見たい</th>
                    <th className={admin.center}>見た</th>
                    <th className={admin.center}>気に入った</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.records.map((r) => (
                    <tr key={r.houseId}>
                      <td>
                        No.{r.houseId} {r.companyName}
                      </td>
                      <td className={admin.center}>{r.wish ? "★" : ""}</td>
                      <td className={admin.center}>{r.visited ? "✓" : ""}</td>
                      <td className={admin.center}>{r.favorite ? "✓" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
        <Link to="/admin/customers" className={admin.backLink}>
          顧客一覧へ戻る
        </Link>
      </main>
    </>
  );
}

export default AdminCustomerDetailPage;
