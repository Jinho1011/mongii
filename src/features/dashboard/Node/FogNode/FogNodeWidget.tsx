import * as React from "react";
import { FogNodeModel } from "./FogNodeModel";
import {
  DiagramEngine,
  PortModelAlignment,
  PortWidget,
} from "@projectstorm/react-diagrams";

import styles from "./FogNodeWidget.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export interface FogNodeWidgetProps {
  node: FogNodeModel;
  engine: DiagramEngine;
}

const FodNodeWidget = (props: FogNodeWidgetProps) => {
  return (
    <div
      className={cx("fog-node")}
      style={{
        width: 100,
        height: 300,
      }}
    >
      <PortWidget
        style={{
          top: "50%",
          right: -8,
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
