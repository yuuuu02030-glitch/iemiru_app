import { Link } from "react-router";
import style from "./CustomerHeader.module.css";

function CustomerHeader({ title, backTo }) {
  return (
    <header className={style.header}>
      <Link to={backTo} className={style.back} aria-label="戻る">
        ‹
      </Link>
      <h1 className={style.title}>{title}</h1>
    </header>
  );
}

export default CustomerHeader;
