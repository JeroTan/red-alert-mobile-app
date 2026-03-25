import { ThemedText } from "@/components/ui/ThemedText";
import { Checkbox } from "expo-checkbox";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ThemedButton } from "../../../components/ui/ThemedButton";
import { usePublicContext } from "../store/PublicContext";
import ReportDescriptionInput from "./ReportDescriptionInput";
import ReportHeader from "./ReportHeader";
import ReportLocationInput from "./ReportLocationInput";
import ReportPhotoInput from "./ReportPhotoInput";

interface ReportFormProps {
  onSubmit: () => void;
}

export function ReportForm({ onSubmit }: ReportFormProps) {
  const { userCoordinates } = usePublicContext();
  const [addAdditionalInfo, setAddAdditionalInfo] = useState(false);

  const allowedToSubmit = useMemo(() => {
    if (!userCoordinates) return false;
    return true;
  }, [userCoordinates]);

  return (
    <View className="p-6">
      <ReportHeader />

      <View className="gap-y-6">
        <ReportLocationInput />

        <ScrollView>
          <View className="">
            <TouchableOpacity
              className="flex flex-row "
              onPress={() => setAddAdditionalInfo(!addAdditionalInfo)}
            >
              <Checkbox
                className="mt-1 mr-2"
                value={addAdditionalInfo}
                onValueChange={setAddAdditionalInfo}
              />
              <ThemedText className="text-sm font-bold text-app-text-muted uppercase mb-2">
                Add Additional Information{" "}
                <Text className="text-xs lowercase opacity-50">
                  (Photos or Description)
                </Text>
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {addAdditionalInfo && <ReportPhotoInput />}
        {addAdditionalInfo && <ReportDescriptionInput />}

        <ThemedButton
          label="SUBMIT NOW"
          variant="critical"
          onPress={onSubmit}
          disabled={!allowedToSubmit}
          className="w-full h-14 shadow-lg "
          textClassName="text-lg uppercase tracking-widest"
        />
      </View>
    </View>
  );
}
