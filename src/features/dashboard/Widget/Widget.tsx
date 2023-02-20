import createEngine, {
  DefaultNodeModel,
  PortModelAlignment,
  DiagramModel,
  PortModel,
  BaseEvent,
} from "@projectstorm/react-diagrams";
import classNames from "classnames/bind";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import styles from "./Widget.module.scss";
import { FogNodeModel, FogPortModel } from "../Node/FogNode/FogNodeModel";
import { FogNodeFactory } from "../Node/FogNode/FogNodeFactory";
import { EdgeNodeFactory } from "../Node/EdgeNode/EdgeNodeFactory";
import { EdgeNodeModel, EdgePortModel } from "../Node/EdgeNode/EdgeNodeModel";
import { SimplePortFactory } from "../Node/SimplePortFactory";
import { Nodes } from "@/pages";

const cx = classNames.bind(styles);

interface WidgetProps {
  data: Nodes;
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

  const fog = new FogNodeModel("fog node 1");
  const fogPort = fog.getPort(PortModelAlignment.RIGHT);
  fog.setPosition(100, 100);

  const edge = new EdgeNodeModel("edge node 1");
  const edgePort = edge.getPort(PortModelAlignment.LEFT);
  edge.setPosition(600, 100);

  const edge2 = new EdgeNodeModel("edge node 2");
  const edgePort2 = edge2.getPort(PortModelAlignment.LEFT);
  edge2.setPosition(600, 400);

  const link1 = (fogPort as FogPortModel).link(edgePort as EdgePortModel);
  const link2 = (fogPort as FogPortModel).link(edgePort2 as EdgePortModel);

  const model = new DiagramModel();
  const models = model.addAll(fog, edge, edge2, link1, link2);

  // add a selection listener to each
  models.forEach((item) =>
    item.registerListener({
      eventDidFire: (event: BaseEvent) => {
        console.log("🚀 ~ file: Widget.tsx:65 ~ Widget ~ models:", models);
      },
    })
  );

  // model.registerListener({
  //   eventDidFire: (event: BaseEvent) => console.log(models),
  // });

  // model.setLocked(true);

  // const state = engine.getStateMachine().getCurrentState();
  // state.deactivated(state);

  engine.setModel(model);

  return <CanvasWidget className={cx("diagram-container")} engine={engine} />;
};

export default Widget;
