import classNames from "classnames/bind";

import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <nav className={cx("header-container")}>
      <div className={cx("logo-container")}>Mongii</div>
      <div className={cx("button-container")}>
        <button className={cx("header-btn")}>add fog</button>
        <button className={cx("header-btn")}>add edge</button>
      </div>
    </nav>
  );
};

export default Header;
