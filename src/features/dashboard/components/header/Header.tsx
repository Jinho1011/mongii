import { NodeType } from "@/pages";
import classNames from "classnames/bind";
import {
  DOMAttributes,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import Modal from "react-modal";
import FormModal from "./FormModal";

import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = ({ data }: { data: NodeType[] }) => {
  const [openFogModal, setOpenFogModal] = useState(false);
  const [openEdgeModal, setOpenEdgeModal] = useState(false);

  return (
    <nav className={cx("header-container")}>
      <div className={cx("logo-container")}>Mongii</div>
      <div className={cx("button-container")}>
        <button
          className={cx("header-btn")}
          onClick={() => setOpenFogModal(true)}
        >
          add fog
        </button>
        <button
          className={cx("header-btn")}
          onClick={() => setOpenEdgeModal(true)}
        >
          add edge
        </button>
      </div>
      <FormModal
        type="fog"
        isOpen={openFogModal}
        closeModal={() => setOpenFogModal(false)}
      />
      <FormModal
        type="edge"
        isOpen={openEdgeModal}
        closeModal={() => setOpenEdgeModal(false)}
        fogs={data.map((node) => {
          return { name: node.name, ip: node.ip };
        })}
      />
    </nav>
  );
};

export default Header;
