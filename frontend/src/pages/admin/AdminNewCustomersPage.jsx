import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMe } from "../../hooks/useMe";
import {
  BUILD_TIMINGS,
  BUILD_TYPES,
  VISIT_REASONS,
} from "../../constants/surveyOptions";
import AdminHeader from "../../components/AdminHeader";
import common from "../../style/common.module.css";
import admin from "../../style/admin.module.css";

function AdminNewCustomersPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    buildType: "",
    buildTiming: "",
    buildArea: "",
    visitReason: "",
  });
  const navigate = useNavigate();
  const { me, roleLabel, logout } = useMe();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setMessage("");
    setErrors({});

    const body = {
      ...form,
      buildType: form.buildType || null,
      buildTiming: form.buildTiming || null,
      buildArea: form.buildArea || null,
      visitReason: form.visitReason || null,
    };

    try {
      const res = await fetch(`/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        window.alert("登録しました");
        navigate("/admin", { state: data });
      } else {
        setErrors(data.errors || {});
      }
    } catch {
      setMessage("通信に失敗しました。時間をおいてもう一度お試しください");
    } finally {
      setSubmitting(false);
    }
  };

  if (me === null) {
    return null;
  }
  return (
    <>
      <AdminHeader roleLabel={roleLabel} onLogout={logout} />

      <main className={admin.main}>
        <h2 className={admin.title}>顧客登録</h2>

        <form onSubmit={handleSubmit} className={admin.formSection}>
          <div className={admin.formColumns}>
            <section className={admin.formSection}>
              <h3 className={admin.subTitle}>お客様情報</h3>
              <label className={admin.field}>
                氏名（必須）
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="例）山田太郎"
                />
                {errors.name && (
                  <p className={admin.fieldError}>{errors.name}</p>
                )}
              </label>

              <label className={admin.field}>
                住所（必須）
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="例）〇〇市〇〇町（市区町村まででも可）"
                />
                {errors.address && (
                  <p className={admin.fieldError}>{errors.address}</p>
                )}
              </label>

              <label className={admin.field}>
                電話番号（必須）
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="例）09012345678（ハイフンなし）"
                />
                {errors.phone && (
                  <p className={admin.fieldError}>{errors.phone}</p>
                )}
              </label>
            </section>

            <section className={admin.formSection}>
              <h3 className={admin.subTitle}>アンケート（任意）</h3>
              <label className={admin.field}>
                建築区分
                <select
                  name="buildType"
                  value={form.buildType}
                  onChange={handleChange}
                >
                  <option value="">選択してください</option>
                  {BUILD_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className={admin.field}>
                建築時期
                <select
                  name="buildTiming"
                  value={form.buildTiming}
                  onChange={handleChange}
                >
                  <option value="">選択してください</option>
                  {BUILD_TIMINGS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className={admin.field}>
                建築予定地
                <input
                  type="text"
                  name="buildArea"
                  value={form.buildArea}
                  onChange={handleChange}
                  placeholder=""
                />
              </label>

              <label className={admin.field}>
                来場動機
                <select
                  name="visitReason"
                  value={form.visitReason}
                  onChange={handleChange}
                >
                  <option value="">選択してください</option>
                  {VISIT_REASONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </section>
          </div>

          <div className={admin.formActions}>
            <button
              type="submit"
              className={common.primaryButton}
              disabled={submitting}
            >
              {submitting ? "送信中..." : "登録する"}
            </button>

            <Link to="/admin" className={admin.backLink}>
              管理者画面へ戻る
            </Link>
          </div>
          {message && <p className={admin.fieldError}>{message}</p>}
        </form>
      </main>
    </>
  );
}

export default AdminNewCustomersPage;
