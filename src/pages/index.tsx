import Widget from "@/features/dashboard/Widget";
import createEngine, {
  DefaultNodeModel,
  DefaultLinkModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import dynamic from "next/dynamic";

export default function Home() {
  const WidgetComponent = dynamic(() => import("@/features/dashboard/Widget"), {
    ssr: false,
  });

  return <WidgetComponent />;
}
