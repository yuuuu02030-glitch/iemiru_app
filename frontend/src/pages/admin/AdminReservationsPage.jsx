import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useMe } from "../../hooks/useMe";
import AdminHeader from "../../components/AdminHeader";

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

      <main>
        <h2>予約一覧</h2>

        <section>
          <p>日付</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <p>{reservations.length}件の予約</p>
        </section>

        {reservations.length === 0 ? (
          <p>この日の予約はありません</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>来場時刻</th>
                <th>氏名</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.reservationsId}>
                  <td>{r.visitDatetime.slice(11, 16)}</td>
                  <td>{r.name}様</td>
                  <td>
                    <Link to={`/admin/customers/${r.customerId}/summary`}>
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Link to="/admin">管理者画面へ戻る</Link>
      </main>
    </>
  );
}

export default AdminReservationsPage;
