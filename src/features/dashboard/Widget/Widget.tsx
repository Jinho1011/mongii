import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import classNames from "classnames/bind";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import styles from "./Widget.module.scss";
import { FogNodeModel } from "../Node/FogNode/FogNodeModel";
import { FogNodeFactory } from "../Node/FogNode/FogNodeFactory";

const cx = classNames.bind(styles);

interface WidgetProps {}

const Widget = ({}: WidgetProps) => {
  const engine = createEngine();

  engine.getNodeFactories().registerFactory(new FogNodeFactory());

  const fog1 = new FogNodeModel("fog node 1");
  fog1.setPosition(100, 100);

  // node 1
  const node1 = new DefaultNodeModel({
    name: "Node 1",
    color: "rgb(0,192,255)",
  });
  node1.setPosition(200, 100);
  let port1 = node1.addOutPort("Out");

  // node 2
  const node2 = new DefaultNodeModel({
    name: "Node 2",
    color: "rgb(126, 130, 40)",
  });
  node2.setPosition(200, 400);
  let port2 = node2.addInPort("In");

  // link them and add a label to the link
  const link = port2.link<DefaultLinkModel>(port1);
  link.addLabel("module312");

  const model = new DiagramModel();
  model.addAll(fog1, node1, node2, link);
  // model.setLocked(true);

  // const state = engine.getStateMachine().getCurrentState();
  // state.deactivated(state);

  engine.setModel(model);

  return <CanvasWidget className={cx("diagram-container")} engine={engine} />;
};

export default Widget;
