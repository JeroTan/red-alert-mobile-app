import { useAppMode } from "@/store/state/AppModeContext";
import { Redirect } from "expo-router";
import React from "react";

export default function AppRouter() {
  const { mode } = useAppMode();

  if (mode === "public") {
    return <Redirect href="/public" />;
  }
  return <Redirect href="/responder" />;
}
