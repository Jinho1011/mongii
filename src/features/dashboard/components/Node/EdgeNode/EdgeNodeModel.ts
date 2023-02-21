import { Edge } from "@/pages";
import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
  LinkModel,
  PortModel,
  DefaultLinkModel,
} from "@projectstorm/react-diagrams";

export class EdgePortModel extends PortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: "edge",
      name: alignment,
      alignment: alignment,
    });
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }

  link<T extends LinkModel>(port: PortModel): T {
    let link = this.createLinkModel();
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link as T;
  }
}

export interface EdgeNodeModelGenerics {
  PORT: EdgePortModel;
}

// this can be further extended for more complicated node types
export class EdgeNodeModel extends NodeModel<
  NodeModelGenerics & EdgeNodeModelGenerics
> {
  edge: Edge | undefined;

  constructor(edge: Edge | undefined) {
    super({
      type: "edge",
    });
    this.edge = edge;
    this.addPort(new EdgePortModel(PortModelAlignment.LEFT));
  }
}
