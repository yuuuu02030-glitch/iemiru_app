import { useState, useEffect } from "react";
import CustomerHeader from "../components/CustomerHeader";
import {
  BUILD_TIMINGS,
  BUILD_TYPES,
  VISIT_REASONS,
} from "../constants/surveyOptions";

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

  return (
    <>
      <CustomerHeader title={"来場予約"} backTo={"/"} />

      <main>
        <section>
          <h2>見たい棟を選ぶ</h2>

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
          <h2>お客様情報</h2>
          <label>
            氏名（必須）
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="例）山田太郎"
            />
          </label>
          <label>
            住所（必須）
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="例）〇〇市〇〇町（市区町村まででも可）"
            />
          </label>
          <label>
            電話番号（必須）
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="例）09012345678（ハイフンなし）"
            />
          </label>
          <h2>アンケート</h2>
          <label>
            建築区分（必須）
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
          <label>
            建築時期（必須）
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
          <label>
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

          <label>
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
        <pre>{JSON.stringify({ ...form, houseIds }, null, 2)}</pre>
      </main>
    </>
  );
}

export default ReservePage;
