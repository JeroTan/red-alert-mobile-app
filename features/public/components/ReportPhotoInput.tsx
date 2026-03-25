import { ImageInput } from "@/components/form/ImageInput";
import { ThemedText } from "@/components/ui/ThemedText";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { View } from "react-native";

export default function ReportPhotoInput() {
  const [selectedImages, setSelectedImages] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);

  return (
    <View>
      <ThemedText className="text-sm font-bold text-app-text-muted uppercase mb-2">
        Photo (Optional)
      </ThemedText>
      <ImageInput images={selectedImages} onFileChange={setSelectedImages} />
    </View>
  );
}
