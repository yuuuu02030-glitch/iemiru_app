import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useMe } from "../../hooks/useMe";
import { formatDatetime } from "../../utils/formatDate";
import {
  BUILD_TIMINGS,
  BUILD_TYPES,
  VISIT_REASONS,
} from "../../constants/surveyOptions";
import AdminHeader from "../../components/AdminHeader";
import admin from "../../style/admin.module.css";

function AdminCustomerDetailPage() {
  const { id } = useParams();
  const { me, roleLabel, logout } = useMe();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [errors, setErrors] = useState({});

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

  const startEdit = () => {
    setEditForm({
      name: customer.name,
      address: customer.address,
      phone: customer.phone,
      buildType: customer.buildType || "",
      buildTiming: customer.buildTiming || "",
      buildArea: customer.buildArea || "",
      visitReason: customer.visitReason || "",
    });

    setIsEditing(true);
  };

  const cancelEdit = () => {
    setErrors({});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleDelete = async () => {
    const ok = window.confirm(`${customer.name}様の顧客情報を削除しますか？`);
    if (!ok) return;

    await fetch(`/api/customers/${id}`, { method: "DELETE" });

    navigate("/admin/customers", { replace: true });
  };

  const handleSave = async () => {
    setErrors({});

    const body = {
      ...editForm,
      buildType: editForm.buildType || null,
      buildTiming: editForm.buildTiming || null,
      buildArea: editForm.buildArea || null,
      visitReason: editForm.visitReason || null,
    };

    const res = await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrors(data.errors || {});
      return;
    }

    setCustomer({ ...customer, ...body });
    setIsEditing(false);
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
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className={`${admin.outlineButton} ${admin.filledButton}`}
                >
                  保存
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className={admin.outlineButton}
                >
                  キャンセル
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={admin.outlineButton}
                  onClick={startEdit}
                >
                  編集
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className={`${admin.outlineButton} ${admin.dangerButton}`}
                >
                  削除
                </button>
              </>
            )}
          </div>
        </div>

        <div className={admin.columns}>
          <section>
            <h3 className={admin.subTitle}>顧客情報・アンケート</h3>
            <table className={admin.table}>
              {isEditing ? (
                <tbody>
                  <tr>
                    <th>氏名</th>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className={admin.fieldError}>{errors.name}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>住所</th>
                    <td>
                      <input
                        type="text"
                        name="address"
                        value={editForm.address}
                        onChange={handleChange}
                      />
                      {errors.address && (
                        <p className={admin.fieldError}>{errors.address}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>電話番号</th>
                    <td>
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <p className={admin.fieldError}>{errors.phone}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>建築区分</th>
                    <td>
                      <select
                        name="buildType"
                        value={editForm.buildType}
                        onChange={handleChange}
                      >
                        <option value="">選択してください</option>
                        {BUILD_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.buildType && (
                        <p className={admin.fieldError}>{errors.buildType}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>建築時期</th>
                    <td>
                      <select
                        name="buildTiming"
                        value={editForm.buildTiming}
                        onChange={handleChange}
                      >
                        <option value="">選択してください</option>
                        {BUILD_TIMINGS.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.buildTiming && (
                        <p className={admin.fieldError}>{errors.buildTiming}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>建築予定地</th>
                    <td>
                      <input
                        type="text"
                        name="buildArea"
                        value={editForm.buildArea}
                        onChange={handleChange}
                      />
                      {errors.buildArea && (
                        <p className={admin.fieldError}>{errors.buildArea}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>来場動機</th>
                    <td>
                      <select
                        name="visitReason"
                        value={editForm.visitReason}
                        onChange={handleChange}
                      >
                        <option value="">選択してください</option>
                        {VISIT_REASONS.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.visitReason && (
                        <p className={admin.fieldError}>{errors.visitReason}</p>
                      )}
                    </td>
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
              ) : (
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
              )}
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
