import { Coordinates } from "@/types/location";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { EmergencyType, PublicStep } from "../types";

export type PublicContextType = {
  publicStep: PublicStep;
  setPublicStep: Dispatch<SetStateAction<PublicStep>>;
  selectedType: EmergencyType | null;
  setSelectedType: Dispatch<SetStateAction<EmergencyType | null>>;
  trackingProgress: number;
  setTrackingProgress: Dispatch<SetStateAction<number>>;
  userCoordinates: Coordinates | null;
  setUserCoordinates: Dispatch<SetStateAction<Coordinates | null>>;
  respondentCoordinates: Coordinates | null;
  setRespondentCoordinates: Dispatch<SetStateAction<Coordinates | null>>;
  facilityCoordinates: Coordinates | null;
  setFacilityCoordinates: Dispatch<SetStateAction<Coordinates | null>>;
  handleSubmitReport: () => Promise<void>;
  handleReset: () => void;
};

export const PublicContext = createContext<PublicContextType>(null!);

export default function PublicContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [publicStep, setPublicStep] = useState<PublicStep>("sos");
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [trackingProgress, setTrackingProgress] = useState(0.1);
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(
    null,
  );
  const [respondentCoordinates, setRespondentCoordinates] =
    useState<Coordinates | null>(null);

  const [facilityCoordinates, setFacilityCoordinates] =
    useState<Coordinates | null>(null);

  const handleSubmitReport = async () => {
    setPublicStep("tracking");
  };

  const handleReset = () => {
    setPublicStep("sos");
    setSelectedType(null);
    setTrackingProgress(0.1);
  };

  return (
    <PublicContext.Provider
      value={{
        publicStep,
        setPublicStep,
        selectedType,
        setSelectedType,
        trackingProgress,
        setTrackingProgress,
        userCoordinates,
        setUserCoordinates,
        respondentCoordinates,
        setRespondentCoordinates,
        facilityCoordinates,
        setFacilityCoordinates,
        handleSubmitReport,
        handleReset,
      }}
    >
      {children}
    </PublicContext.Provider>
  );
}

export function usePublicContext() {
  return useContext(PublicContext);
}
