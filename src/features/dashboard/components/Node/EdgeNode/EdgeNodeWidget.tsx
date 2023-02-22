import * as React from "react";
import { EdgeNodeModel } from "./EdgeNodeModel";
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from "@projectstorm/react-diagrams";
import useCollapse from "react-collapsed";
import classNames from "classnames/bind";

import styles from "../FogNode/FogNodeWidget.module.scss";
import { useState } from "react";
import Module from "../Module";

const cx = classNames.bind(styles);

export interface EdgeNodeWidgetProps {
  node: EdgeNodeModel;
  engine: DiagramEngine;
}

const EdgeNodeWidget = (props: EdgeNodeWidgetProps) => {
  const edge = props.node.edge;
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
        <h2 className={cx("node-title")}>{edge?.name}</h2>
        <div className={cx("node-badge", "fog")}>Edge</div>
      </div>
      <div {...getCollapseProps()}>
        <div className={cx("divider")}>
          <hr className={cx("solid")} />
        </div>
        <div className={cx("information-table")}>
          <div className={cx("information-row")}>
            <label className={cx("information-label")}>info</label>
            <span className={cx("information-value")}>{edge?.info}</span>
          </div>
          <div className={cx("information-row")}>
            <label className={cx("information-label")}>ip</label>
            <span className={cx("information-value")}>{edge?.ip}</span>
          </div>
          <div className={cx("information-row")}>
            <label className={cx("information-label")}>last updated</label>
            <span className={cx("information-value")}>
              {new Date(edge?.updated_date || "").toLocaleString()}
            </span>
          </div>
        </div>
        <div className={cx("divider")}>
          <hr className={cx("solid")} />
        </div>
        <div className={cx("modules-container")}>
          <label className={cx("information-label")}>Modules</label>
          <div className={cx("modules")}>
            {edge?.module.map((v, i) => {
              return <Module module={v} index={i} key={v.module_id} />;
            })}
          </div>
        </div>
      </div>
      <PortWidget
        style={{
          top: "40%",
          left: -10,
          position: "absolute",
        }}
        port={props.node.getPort(PortModelAlignment.LEFT)!}
        engine={props.engine}
      >
        <div className={cx("port")} />
      </PortWidget>
    </div>
  );
};

export default EdgeNodeWidget;
