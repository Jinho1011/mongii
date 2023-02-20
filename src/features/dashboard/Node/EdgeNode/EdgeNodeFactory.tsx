import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { EdgeNodeModel } from "./EdgeNodeModel";
import EdgeNodeWidget from "./EdgeNodeWidget";

export class EdgeNodeFactory extends AbstractReactFactory<
  EdgeNodeModel,
  DiagramEngine
> {
  constructor() {
    super("edge");
  }

  generateReactWidget(event: any): JSX.Element {
    return <EdgeNodeWidget engine={this.engine} node={event.model} />;
  }

  generateModel(event: any) {
    return new EdgeNodeModel("test");
  }
}
