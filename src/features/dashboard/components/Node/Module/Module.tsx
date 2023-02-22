import { Module } from "@/pages";
import classNames from "classnames/bind";
import { useState } from "react";
import useCollapse from "react-collapsed";
import styles from "./Module.module.scss";

const cx = classNames.bind(styles);

interface ModuleProps {
  module: Module;
  index: number;
}

const Modules = ({ module, index }: ModuleProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className={cx("module-container")}>
      <div
        className={cx("module")}
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <div>
          <span className={cx("module-priority")}>{module.priority}</span>
          <span className={cx("module-name")}>{module.name}</span>
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
                {/* {module.github_url} */}
              </div>
            </div>
          </div>
          <div className={cx("module-body-status")} />
        </div>
      </div>
    </div>
  );
};

export default Modules;
