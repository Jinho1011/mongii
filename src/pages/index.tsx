import Header from "@/features/dashboard/components/header/Header";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export interface Module {
  module_id: number;
  ip: string;
  name: string;
  info: string;
  priority: number;
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

const data: Nodes = {
  data: [
    {
      node_id: 1,
      ip: "12345",
      name: "fog node 1",
      info: "1234",
      created_date: "2023-02-17T02:00:16.000Z",
      updated_date: "2023-02-17T02:00:33.000Z",
      module: [
        {
          module_id: 1,
          ip: "11",
          name: "11",
          info: "111",
          priority: 1,
          edge_id: null,
          node_id: 1,
          created_date: "2023-02-20T17:06:36.000Z",
          updated_date: "2023-02-20T18:07:26.000Z",
        },
        {
          module_id: 2,
          ip: "11",
          name: "test",
          info: "111",
          priority: 2,
          edge_id: null,
          node_id: 1,
          created_date: "2023-02-20T17:07:20.000Z",
          updated_date: "2023-02-20T18:07:26.000Z",
        },
      ],
      edge: [
        {
          edge_id: 1,
          ip: "1234",
          name: "1234",
          info: "1234",
          password: "123",
          node_id: 1,
          created_date: "2023-02-17T02:00:57.000Z",
          updated_date: "2023-02-17T02:00:57.000Z",
          module: [
            {
              module_id: 1,
              ip: "11",
              name: "11",
              info: "111",
              priority: 1,
              edge_id: 1,
              node_id: null,
              created_date: "2023-02-20T17:06:36.000Z",
              updated_date: "2023-02-20T18:07:26.000Z",
            },
            {
              module_id: 2,
              ip: "11",
              name: "test",
              info: "111",
              priority: 1,
              edge_id: 1,
              node_id: null,
              created_date: "2023-02-20T17:07:20.000Z",
              updated_date: "2023-02-20T18:07:26.000Z",
            },
          ],
        },
        {
          edge_id: 2,
          ip: "1234",
          name: "1234",
          info: "1234",
          password: "123",
          node_id: 1,
          created_date: "2023-02-17T09:34:16.000Z",
          updated_date: "2023-02-17T09:34:16.000Z",
          module: [
            {
              module_id: 3,
              ip: "11",
              name: "test",
              info: "111",
              priority: 1,
              edge_id: 2,
              node_id: null,
              created_date: "2023-02-20T17:33:13.000Z",
              updated_date: "2023-02-20T18:07:33.000Z",
            },
            {
              module_id: 4,
              ip: "11",
              name: "test",
              info: "111",
              priority: 1,
              edge_id: 2,
              node_id: null,
              created_date: "2023-02-20T17:33:14.000Z",
              updated_date: "2023-02-20T18:07:33.000Z",
            },
          ],
        },
        {
          edge_id: 3,
          ip: "1234",
          name: "1234",
          info: "1234",
          password: "123",
          node_id: 1,
          created_date: "2023-02-17T09:34:17.000Z",
          updated_date: "2023-02-17T09:34:17.000Z",
          module: [],
        },
        {
          edge_id: 5,
          ip: "12345",
          name: "1234",
          info: "1234",
          password: "",
          node_id: 1,
          created_date: "2023-02-19T06:42:08.000Z",
          updated_date: "2023-02-19T06:42:08.000Z",
          module: [],
        },
      ],
    },
    {
      node_id: 2,
      ip: "12345",
      name: "1234",
      info: "1234",
      created_date: "2023-02-17T09:34:44.000Z",
      updated_date: "2023-02-17T09:34:44.000Z",
      edge: [],
      module: [
        {
          module_id: 3,
          ip: "11",
          name: "test",
          info: "111",
          priority: 1,
          edge_id: null,
          node_id: 2,
          created_date: "2023-02-20T17:33:13.000Z",
          updated_date: "2023-02-20T18:07:33.000Z",
        },
        {
          module_id: 4,
          ip: "11",
          name: "test",
          info: "111",
          priority: 1,
          edge_id: null,
          node_id: 2,
          created_date: "2023-02-20T17:33:14.000Z",
          updated_date: "2023-02-20T18:07:33.000Z",
        },
      ],
    },
    {
      node_id: 3,
      ip: "",
      name: "sacasd",
      info: "",
      created_date: "2023-02-19T06:39:09.000Z",
      updated_date: "2023-02-19T06:39:09.000Z",
      edge: [],
      module: [
        {
          module_id: 3,
          ip: "11",
          name: "test",
          info: "111",
          priority: 1,
          edge_id: null,
          node_id: 3,
          created_date: "2023-02-20T17:33:13.000Z",
          updated_date: "2023-02-20T18:07:33.000Z",
        },
        {
          module_id: 4,
          ip: "11",
          name: "test",
          info: "111",
          priority: 1,
          edge_id: null,
          node_id: 3,
          created_date: "2023-02-20T17:33:14.000Z",
          updated_date: "2023-02-20T18:07:33.000Z",
        },
      ],
    },
  ],
  message: "getAll",
};

export default function Home() {
  const WidgetComponent = dynamic(
    () => import("@/features/dashboard/components/Widget"),
    {
      ssr: false,
    }
  );

  return (
    <>
      <Header data={data.data} />
      <WidgetComponent data={data.data} />
    </>
  );
}
