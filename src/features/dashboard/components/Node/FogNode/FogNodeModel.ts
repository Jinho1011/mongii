import { NodeType } from "@/pages";
import {
  NodeModel,
  NodeModelGenerics,
  PortModelAlignment,
  LinkModel,
  PortModel,
  DefaultLinkModel,
} from "@projectstorm/react-diagrams";

export class FogPortModel extends PortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: "fog",
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

export interface FogNodeModelGenerics {
  PORT: FogPortModel;
}

// this can be further extended for more complicated node types
export class FogNodeModel extends NodeModel<
  NodeModelGenerics & FogNodeModelGenerics
> {
  node: NodeType | null;

  constructor(node: NodeType | null) {
    super({
      type: "fog",
    });
    this.node = node;
    this.addPort(new FogPortModel(PortModelAlignment.RIGHT));
  }
}
