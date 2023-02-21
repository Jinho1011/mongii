import createEngine, {
  DefaultNodeModel,
  PortModelAlignment,
  DiagramModel,
  PortModel,
  BaseEvent,
  BaseModel,
  NodeModel,
} from "@projectstorm/react-diagrams";
import classNames from "classnames/bind";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import styles from "./Widget.module.scss";
import { FogNodeModel, FogPortModel } from "../Node/FogNode/FogNodeModel";
import { FogNodeFactory } from "../Node/FogNode/FogNodeFactory";
import { EdgeNodeFactory } from "../Node/EdgeNode/EdgeNodeFactory";
import { EdgeNodeModel, EdgePortModel } from "../Node/EdgeNode/EdgeNodeModel";
import { SimplePortFactory } from "../Node/SimplePortFactory";
import { Node } from "../../../pages";

const cx = classNames.bind(styles);

interface WidgetProps {
  data: Node[];
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
        return b.node.node_id - a.node.node_id;
      }
      return 0;
    })
    .map((baseModel, index) =>
      (baseModel as FogNodeModel).setPosition(400, 200 + 400 * index)
    );
  const edgeNodes = baseModels
    .filter(
      (baseModel) =>
        Object.getPrototypeOf(baseModel).constructor.name === "EdgeNodeModel" &&
        baseModel
    )
    .sort((a: any, b: any) => {
      if (a?.edge && b?.edge) {
        return b.edge.edge_id - a.edge.edge_id;
      }
      return 0;
    })
    .map((baseModel, index) =>
      (baseModel as EdgeNodeModel).setPosition(
        900 + 10 * index,
        200 + 300 * index
      )
    );

  // model.registerListener({
  //   eventDidFire: (event: BaseEvent) => console.log(models),
  // });

  // model.setLocked(true);

  // const state = engine.getStateMachine().getCurrentState();
  // state.deactivated(state);

  model.addAll(...(baseModels as any));

  engine.setModel(model);

  return <CanvasWidget className={cx("diagram-container")} engine={engine} />;
};

export default Widget;
