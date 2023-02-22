import { NodeType } from "@/pages";
import _ from "lodash";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface NodesResponseType {
  data: NodeType[];
  message: string;
}

export const useNodes = () => {
  const getNodes = async () => {
    const data = await fetch(
      `http://api-mongy.bibim-bap.com/node/join?pageNo=0`
    );
    return data.json();
  };

  return useQuery<NodesResponseType>("nodes", getNodes, {
    refetchInterval: 1000,
    notifyOnChangeProps: ["data"],
  });
};

export const useCreateNode = () => {
  const queryClient = useQueryClient();

  const postNode = async ({
    ip,
    name,
    info,
  }: {
    ip: string;
    name: string;
    info: string;
  }) => {
    return await fetch("http://api-mongy.bibim-bap.com/node", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip,
        name,
        info,
      }),
    });
  };

  return useMutation(postNode, {
    onSuccess: () => queryClient.invalidateQueries("nodes"),
  });
};

export const useCreateEdge = () => {
  const queryClient = useQueryClient();

  const postNode = async ({
    ip,
    name,
    info,
    password,
    node_id,
  }: {
    ip: string;
    name: string;
    info: string;
    password: string;
    node_id: number;
  }) => {
    return await fetch("http://api-mongy.bibim-bap.com/node", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip,
        name,
        info,
        password,
        node_id,
      }),
    });
  };

  return useMutation(postNode, {
    onSuccess: () => queryClient.invalidateQueries("nodes"),
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  const postNode = async ({
    ip,
    name,
    info,
    priority,
    edge_id,
    node_id,
    state = 0,
    github_url,
  }: {
    ip: string;
    name: string;
    info: string;

    priority: number;
    node_id: number | undefined;
    edge_id: number | undefined;
    state?: number;
    github_url: string;
  }) => {
    return await fetch("http://api-mongy.bibim-bap.com/node", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip,
        name,
        info,
        priority,
        state,
        github_url,
        ...(node_id && { node_id }),
        ...(edge_id && { edge_id }),
      }),
    });
  };

  return useMutation(postNode, {
    onSuccess: () => queryClient.invalidateQueries("nodes"),
  });
};
