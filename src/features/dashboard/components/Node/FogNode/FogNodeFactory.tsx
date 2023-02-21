import { FogNodeModel } from "./FogNodeModel";
import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import FogNodeWidget from "./FogNodeWidget";

export class FogNodeFactory extends AbstractReactFactory<
  FogNodeModel,
  DiagramEngine
> {
  constructor() {
    super("fog");
  }

  generateReactWidget(event: any): JSX.Element {
    return <FogNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: any) {
    return new FogNodeModel(null);
  }
}
