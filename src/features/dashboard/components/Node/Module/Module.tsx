import classNames from "classnames/bind";
import { useState } from "react";
import useCollapse from "react-collapsed";
import styles from "./Module.module.scss";

const cx = classNames.bind(styles);

const Module = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  // className={cx("")}
  return (
    <div className={cx("module-container")}>
      <div
        className={cx("module")}
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <div>
          <span className={cx("module-priority")}>1</span>
          <span className={cx("module-name")}>module name1</span>
        </div>
        <div
          className={cx("module-status", isExpanded ? "expanded" : "collapsed")}
        />
      </div>
      <div {...getCollapseProps()}>
        <div className={cx("module-body")}>
          <div className={cx("module-information")}>
            <div className={cx("module-info")}>
              <div className={cx("module-label")}>github</div>
              <div className={cx("module-value")}>
                https://github.com/sullog/sullog-clientsullog-client
              </div>
            </div>
            <div className={cx("module-info")}>
              <div className={cx("module-label")}>script</div>
              <div className={cx("module-value")}>
                asdkha sjakfhsjdklhfjksdahfjkhads
                jkfkadshfjhasjdkhfjkdshajfkhdsjkahfjkh asdkha
                jkfkadshfjhasjdkhfjkdshajfkhdsjkahfjkh asdkha
              </div>
            </div>
          </div>
          <div className={cx("module-body-status")} />
        </div>
      </div>
    </div>
  );
};

export default Module;
