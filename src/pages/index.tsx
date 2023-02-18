import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default function Home() {
  const WidgetComponent = dynamic(() => import("@/features/dashboard/Widget"), {
    ssr: false,
  });

  return <WidgetComponent />;
}
