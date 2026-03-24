import {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from "react";

export type AppMode = "public" | "responder";
interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export function AppModeProvider({ children }: PropsWithChildren<{}>) {
  const [mode, setMode] = useState<AppMode>("public");
  return (
    <>
      <AppModeContext.Provider value={{ mode, setMode }}>
        {children}
      </AppModeContext.Provider>
    </>
  );
}

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error("useAppMode must be used within an AppModeProvider");
  }
  return context;
}
