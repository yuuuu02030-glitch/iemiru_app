import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMe } from "../../hooks/useMe";
import AdminHeader from "../../components/AdminHeader";
import admin from "../../style/admin.module.css";

function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const { me, roleLabel, logout } = useMe();

  const today = new Date().toLocaleDateString("sv-SE");
  const [date, setDate] = useState(today);

  useEffect(() => {
    fetch(`/api/reservations?date=${date}`)
      .then((res) => res.json())
      .then((data) => setReservations(data));
  }, [date]);

  if (me === null) {
    return null;
  }

  return (
    <>
      <AdminHeader roleLabel={roleLabel} onLogout={logout} />

      <main className={admin.main}>
        <h2 className={admin.title}>予約一覧</h2>

        <div className={admin.dateRow}>
          <label className={admin.dateField}>
            日付
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <p className={admin.count}>{reservations.length}件の予約</p>
        </div>

        {reservations.length === 0 ? (
          <p className={admin.empty}>この日の予約はありません</p>
        ) : (
          <table className={admin.table}>
            <thead>
              <tr>
                <th>来場時刻</th>
                <th>氏名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.reservationId}>
                  <td>{r.visitDatetime.slice(11, 16)}</td>
                  <td>{r.name}様</td>
                  <td className={admin.right}>
                    <Link
                      to={`/admin/customers/${r.customerId}/summary`}
                      className={admin.detailLink}
                    >
                      詳細 ›
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Link to="/admin" className={admin.backLink}>
          管理者画面へ戻る
        </Link>
      </main>
    </>
  );
}

export default AdminReservationsPage;
