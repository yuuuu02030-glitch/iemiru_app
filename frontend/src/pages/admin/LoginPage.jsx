import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AdminHeader from "../../components/AdminHeader";
import styles from "./LoginPage.module.css";
import common from "../../style/common.module.css";

function LoginPage() {
  const [form, setForm] = useState({
    loginId: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setMessage("");

    const body = {
      loginId: form.loginId || null,
      password: form.password || null,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/admin", { state: data });
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("通信に失敗しました。時間をおいてもう一度お試しください");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader />

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.card}>
          <h2 className={styles.title}>スタッフログイン</h2>

          <label className={styles.field}>
            ログインID
            <input
              type="text"
              name="loginId"
              value={form.loginId}
              onChange={handleChange}
              placeholder="ログインIDを入力"
            />
          </label>

          <label className={styles.field}>
            パスワード
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="●●●●●●●●"
            />
          </label>

          {message && <p className={styles.error}>{message}</p>}
          <button
            type="submit"
            disabled={submitting}
            className={common.primaryButton}
          >
            {submitting ? "ログイン中..." : "ログイン"}
          </button>

          <Link to="/" className={styles.backLink}>
            トップページへ戻る
          </Link>
        </form>
      </main>
    </>
  );
}

export default LoginPage;
