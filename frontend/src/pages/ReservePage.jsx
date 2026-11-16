import { useState, useEffect } from "react";
import CustomerHeader from "../components/CustomerHeader";
import { Link, useNavigate } from "react-router";
import {
  BUILD_TIMINGS,
  BUILD_TYPES,
  VISIT_REASONS,
  TIME_SLOTS,
} from "../constants/surveyOptions";
import styles from "./ReservePage.module.css";
import common from "../style/common.module.css";

function ReservePage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    buildType: "",
    buildTiming: "",
    buildArea: "",
    visitReason: "",
  });

  const [houseIds, setHouseIds] = useState([]);
  const [houses, setHouses] = useState([]);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toLocaleDateString("sv-SE");

  useEffect(() => {
    fetch("/api/houses")
      .then((res) => res.json())
      .then((data) => setHouses(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleHouse = (id) => {
    if (houseIds.includes(id)) {
      setHouseIds(houseIds.filter((h) => h !== id));
    } else {
      setHouseIds([...houseIds, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...form,
      buildArea: form.buildArea || null,
      visitReason: form.visitReason || null,
      houseIds,
      visitDatetime:
        visitDate && visitTime ? `${visitDate}T${visitTime}:00` : null,
    };

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res.ok) {
      navigate("/reserve/complete", { state: data });
    } else {
      setMessage(data.message);
      setErrors(data.errors || {});
    }
  };

  return (
    <>
      <CustomerHeader title={"来場予約"} backTo={"/"} />

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <section>
            <h2>見たい棟を選ぶ</h2>
            {errors.houseIds && <p>{errors.houseIds}</p>}
            <button
              type="button"
              onClick={() => setHouseIds(houses.map((h) => h.houseId))}
            >
              すべて選択
            </button>
            {houses.map((house) => (
              <label key={house.houseId}>
                <input
                  type="checkbox"
                  checked={houseIds.includes(house.houseId)}
                  onChange={() => toggleHouse(house.houseId)}
                />
                No.{house.houseId} {house.companyName}
              </label>
            ))}
          </section>

          <section>
            <h2>来場日時</h2>
            {errors.visitDatetime && <p>{errors.visitDatetime}</p>}
            <label className={styles.field}>
              来場日
              <input
                type="date"
                min={minDate}
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </label>
            <div className={styles.field}>
              <p>時間帯</p>
              <div className={styles.timeSlot}>
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setVisitTime(time)}
                    className={visitTime === time ? styles.selected : ""}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2>お客様情報</h2>
            <label className={styles.field}>
              氏名（必須）
              {errors.name && <p>{errors.name}</p>}
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="例）山田太郎"
              />
            </label>

            <label className={styles.field}>
              住所（必須）
              {errors.address && <p>{errors.address}</p>}
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="例）〇〇市〇〇町（市区町村まででも可）"
              />
            </label>

            <label className={styles.field}>
              電話番号（必須）
              {errors.phone && <p>{errors.phone}</p>}
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="例）09012345678（ハイフンなし）"
              />
            </label>
          </section>

          <section>
            <h2>アンケート</h2>
            <label className={styles.field}>
              建築区分（必須）
              {errors.buildType && <p>{errors.buildType}</p>}
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

            <label className={styles.field}>
              建築時期（必須）
              {errors.buildTiming && <p>{errors.buildTiming}</p>}
              <select
                name="buildTiming"
                value={form.buildTiming}
                onChange={handleChange}
              >
                <option value="">選択してください</option>
                {BUILD_TIMINGS.map((timing) => (
                  <option key={timing} value={timing}>
                    {timing}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              建築予定地（任意）
              <input
                type="text"
                name="buildArea"
                value={form.buildArea}
                onChange={handleChange}
                maxLength={50}
                placeholder="例）〇〇市 〇〇方面 〇〇小学校区"
              />
            </label>

            <label className={styles.field}>
              来場動機（任意）
              <select
                name="visitReason"
                value={form.visitReason}
                onChange={handleChange}
              >
                <option value="">選択してください</option>
                {VISIT_REASONS.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </label>
          </section>
          <button type="submit" className={common.primaryButton}>
            予約する
          </button>
        </form>
        {message && <p>{message}</p>}
        <Link to="/">戻る</Link>
      </main>
    </>
  );
}

export default ReservePage;
