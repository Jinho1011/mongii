/* eslint-disable react-hooks/rules-of-hooks */
import { useNodes } from "@/features/dashboard/api";
import Header from "@/features/dashboard/components/header/Header";
import dynamic from "next/dynamic";
import React from "react";
import { useEffect, useState } from "react";

export interface Module {
  module_id: number;
  ip: string;
  name: string;
  info: string;
  priority: number;
  github_url: string;
  state: 0 | 1 | 2;
  edge_id: number | null;
  node_id: number | null;
  created_date: string;
  updated_date: string;
}

export interface Edge {
  edge_id: number;
  ip: string;
  name: string;
  info: string;
  password: string;
  node_id: number;
  created_date: string;
  updated_date: string;
  module: Module[];
}

export interface NodeType {
  node_id: number;
  ip: string;
  name: string;
  info: string;
  created_date: string;
  updated_date: string;
  edge: Edge[];
  module: Module[];
}

export interface Nodes {
  data: NodeType[];
  message: string;
}

const WidgetComponent = dynamic(
  () =>
    import("@/features/dashboard/components/Widget").then((mod) => mod.default),
  {
    ssr: false,
  }
);

function Home() {
  const { data } = useNodes();

  if (!data) {
    return <></>;
  }

  return (
    <div>
      <Header data={data.data} />
      <WidgetComponent data={data.data} />
    </div>
  );
}

export default Home;
