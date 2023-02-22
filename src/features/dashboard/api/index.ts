import { NodeType } from "@/pages";
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
  });
};

export const useCreateNode = () => {
  const queryClient = useQueryClient();

  const postNode = async ({ ip, name, info }: any) => {
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
