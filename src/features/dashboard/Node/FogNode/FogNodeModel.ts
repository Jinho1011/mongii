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
}

export interface FogNodeModelGenerics {
  PORT: FogPortModel;
}

// this can be further extended for more complicated node types
export class FogNodeModel extends NodeModel<
  NodeModelGenerics & FogNodeModelGenerics
> {
  name: string;

  constructor(name: string) {
    super({
      type: "fog",
    });
    this.name = name;
    this.addPort(new FogPortModel(PortModelAlignment.RIGHT));
  }
}
