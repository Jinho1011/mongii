import * as React from "react";
import { FogNodeModel } from "./FogNodeModel";
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from "@projectstorm/react-diagrams";
import useCollapse from "react-collapsed";
import classNames from "classnames/bind";

import styles from "./FogNodeWidget.module.scss";
import { useState } from "react";
import Module from "../Module";

const cx = classNames.bind(styles);

export interface FogNodeWidgetProps {
  node: FogNodeModel;
  engine: DiagramEngine;
}

const FodNodeWidget = (props: FogNodeWidgetProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  return (
    <div className={cx("node-container")}>
      <div
        className={cx("node-title-container")}
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <h2 className={cx("node-title")}>{props.node.name}</h2>
      </div>
      <div {...getCollapseProps()}>
        <div className={cx("divider")}>
          <hr className={cx("solid")} />
        </div>
        <div className={cx("information-table")}>
          <div className={cx("information-row")}>
            <label className={cx("information-label")}>Status</label>
            <span className={cx("information-value")}>Success</span>
          </div>
          <div className={cx("information-row")}>
            <label className={cx("information-label")}>Status</label>
            <span className={cx("information-value")}>Success</span>
          </div>
          <div className={cx("information-row")}>
            <label className={cx("information-label")}>Status</label>
            <span className={cx("information-value")}>Success</span>
          </div>
        </div>
        <div className={cx("divider")}>
          <hr className={cx("solid")} />
        </div>
        <div className={cx("modules-container")}>
          <label className={cx("information-label")}>Modules</label>
          <div className={cx("modules")}>
            <Module />
          </div>
        </div>
      </div>
      <PortWidget
        style={{
          top: "40%",
          right: -10,
          position: "absolute",
        }}
        port={props.node.getPort(PortModelAlignment.RIGHT)!}
        engine={props.engine}
      >
        <div className={cx("port")} />
      </PortWidget>
    </div>
  );
};

export default FodNodeWidget;
