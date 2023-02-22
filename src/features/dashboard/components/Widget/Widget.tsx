import createEngine, {
  PortModelAlignment,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import classNames from "classnames/bind";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import styles from "./Widget.module.scss";
import { FogNodeModel, FogPortModel } from "../Node/FogNode/FogNodeModel";
import { FogNodeFactory } from "../Node/FogNode/FogNodeFactory";
import { EdgeNodeFactory } from "../Node/EdgeNode/EdgeNodeFactory";
import { EdgeNodeModel, EdgePortModel } from "../Node/EdgeNode/EdgeNodeModel";
import { SimplePortFactory } from "../Node/SimplePortFactory";
import { NodeType } from "@/pages";
import React from "react";
import _ from "lodash";

const cx = classNames.bind(styles);

interface WidgetProps {
  data: NodeType[];
}

const Widget = ({ data }: WidgetProps) => {
  const engine = createEngine();

  engine.getNodeFactories().registerFactory(new FogNodeFactory());
  engine
    .getPortFactories()
    .registerFactory(
      new SimplePortFactory(
        "fog",
        (config) => new FogPortModel(PortModelAlignment.RIGHT)
      )
    );
  engine.getNodeFactories().registerFactory(new EdgeNodeFactory());
  engine
    .getPortFactories()
    .registerFactory(
      new SimplePortFactory(
        "edge",
        (config) => new EdgePortModel(PortModelAlignment.LEFT)
      )
    );

  const model = new DiagramModel();

  const baseModels = data
    .sort((a, b) => b.node_id - a.node_id)
    .map((node) => {
      const fogNode = new FogNodeModel(node);
      const fogPort = fogNode.getPort(PortModelAlignment.RIGHT);

      const edges = node.edge.map((edge) => {
        const edgeNode = new EdgeNodeModel(edge);
        const edgePort = edgeNode.getPort(PortModelAlignment.LEFT);
        return [edgeNode, edgePort];
      });

      const links = edges.map((edge) => {
        return (fogPort as FogPortModel).link(edge[1] as EdgePortModel);
      });

      return [fogNode, ...edges.flat(), ...links];
    })
    .flat();

  const FogNodes = baseModels
    .filter(
      (baseModel) =>
        Object.getPrototypeOf(baseModel).constructor.name === "FogNodeModel" &&
        baseModel
    )
    .sort((a: any, b: any) => {
      if (b.node && a.node) {
        return a.node.node_id - b.node.node_id;
      }
      return 0;
    })
    .map((baseModel, index) =>
      (baseModel as FogNodeModel).setPosition(
        screen.width / 2 - 410,
        100 + 400 * index
      )
    );
  const edgeNodes = baseModels
    .filter(
      (baseModel) =>
        Object.getPrototypeOf(baseModel).constructor.name === "EdgeNodeModel" &&
        baseModel
    )
    .sort((a: any, b: any) => {
      if (a?.edge && b?.edge) {
        return a.edge.node_id - b.edge.node_id;
      }
      return 0;
    })
    .map((baseModel, index) =>
      (baseModel as EdgeNodeModel).setPosition(
        screen.width / 2 + 50 + 10 * index,
        100 + 300 * index
      )
    );

  // model.setLocked(true);

  // const state = engine.getStateMachine().getCurrentState();
  // state.deactivated(state);

  model.addAll(...(baseModels as any));

  engine.setModel(model);

  return <CanvasWidget className={cx("diagram-container")} engine={engine} />;
};

export default React.memo(Widget, (a, b) => {
  console.log(_.isEqual(a, b));
  return _.isEqual(a, b);
});
