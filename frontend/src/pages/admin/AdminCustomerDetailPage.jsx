import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useMe } from "../../hooks/useMe";
import { formatDatetime } from "../../utils/formatDate";
import AdminHeader from "../../components/AdminHeader";

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

  if (me === null || customer === null) {
    return null;
  }

  return (
    <>
      <AdminHeader roleLabel={roleLabel} onLogout={logout} />

      <main>
        <div>
          <h2>顧客詳細</h2>
          <button>編集</button>
          <button>削除</button>
        </div>

        <div>
          <h3>顧客情報・アンケート</h3>
          <table>
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
        </div>
        <div>
          <h3>見学記録（表示のみ）</h3>
          {customer.records.length === 0 ? (
            <p>見学記録はありません</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>住宅</th>
                  <th>見たい</th>
                  <th>見た</th>
                  <th>気に入った</th>
                </tr>
              </thead>
              <tbody>
                {customer.records.map((r) => (
                  <tr key={r.houseId}>
                    <td>
                      No.{r.houseId} {r.companyName}
                    </td>
                    <td>{r.wish ? "★" : ""}</td>
                    <td>{r.visited ? "✓" : ""}</td>
                    <td>{r.favorite ? "✓" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Link to="/admin/customers">顧客一覧へ戻る</Link>
      </main>
    </>
  );
}

export default AdminCustomerDetailPage;
