import { ThemedText } from "@/components/ui/ThemedText";
import { cn } from "@/components/ui/ThemedView";
import { colors } from "@/style/colors";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { CirclePlus, SquarePen, X } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

export interface ImageInputProps {
  /**
   * Array of selected images.
   * Even for single selection, this should be an array (with one item).
   */
  images: ImagePicker.ImagePickerAsset[];
  /**
   * Callback when images change (add or remove).
   */
  onFileChange: (images: ImagePicker.ImagePickerAsset[]) => void;
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether to allow multiple image selection.
   * Note: Limited support on some Android versions.
   */
  multiInput?: boolean;
  /**
   * Optional custom class name for the container.
   */
  className?: string;
}

export function ImageInput({
  images,
  onFileChange,
  disabled = false,
  multiInput = false,
  className,
}: ImageInputProps) {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    if (disabled) return;

    try {
      setLoading(true);
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: multiInput,
        quality: 0.8,
        allowsEditing: !multiInput, // Edit only available for single selection usually
        aspect: !multiInput ? [4, 3] : undefined,
      });

      if (!result.canceled) {
        if (multiInput) {
          // Append new images to existing ones
          onFileChange([...images, ...result.assets]);
        } else {
          // Replace existing image
          onFileChange(result.assets);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    if (disabled) return;
    const newImages = images.filter((_, index) => index !== indexToRemove);
    onFileChange(newImages);
  };

  const renderContent = () => {
    // 1. Single Input with Image: Show big preview (replace button)
    if (!multiInput && images.length > 0) {
      return (
        <View className="relative w-full h-32 rounded-xl overflow-hidden border border-app-divider bg-gray-100 dark:bg-gray-800">
          <Image
            source={{ uri: images[0].uri }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={200}
          />
          {!disabled && (
            <View className="absolute top-2 right-2 flex-row gap-2">
              <TouchableOpacity
                onPress={pickImage}
                className="bg-black/60 rounded-full p-2"
              >
                <SquarePen size={16} {...{ color: "white" }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeImage(0)}
                className="bg-black/60 rounded-full p-2"
              >
                <X size={16} {...{ color: "white" }} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }

    // 2. Empty State (or Multi Input with no images)
    if (images.length === 0) {
      return (
        <TouchableOpacity
          onPress={pickImage}
          disabled={disabled || loading}
          className={cn(
            "w-full h-32 border-2 border-dashed border-app-divider rounded-xl justify-center items-center bg-app-background dark:bg-gray-800/50 transition-opacity",
            disabled && "opacity-50",
            loading && "opacity-80",
          )}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              {...{ color: colors.light.text.muted }}
            />
          ) : (
            <>
              <View className="mb-2 opacity-60">
                <CirclePlus size={32} {...{ color: colors.light.text.muted }} />
              </View>
              <ThemedText className="text-app-text-muted text-sm font-medium">
                {multiInput ? "Add Photos" : "Add Photo"}
              </ThemedText>
            </>
          )}
        </TouchableOpacity>
      );
    }

    // 3. Multi Input with Images: Show previews + small add button beside
    return (
      <View className="flex-row flex-wrap gap-2">
        {images.map((img, index) => (
          <View
            key={img.uri + index}
            className="relative w-24 h-24 rounded-lg overflow-hidden border border-app-divider bg-gray-100 dark:bg-gray-800"
          >
            <Image
              source={{ uri: img.uri }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />

            {!disabled && (
              <TouchableOpacity
                onPress={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <X size={12} {...{ color: "white" }} />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {!disabled && (
          <TouchableOpacity
            onPress={pickImage}
            disabled={loading}
            className="w-24 h-24 border-2 border-dashed border-app-divider rounded-lg justify-center items-center bg-app-background dark:bg-gray-800/50"
          >
            {loading ? (
              <ActivityIndicator
                size="small"
                {...{ color: colors.light.text.muted }}
              />
            ) : (
              <CirclePlus size={24} {...{ color: colors.light.text.muted }} />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return <View className={cn("w-full", className)}>{renderContent()}</View>;
}
