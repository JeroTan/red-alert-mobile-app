import { Map } from "@/components/ui/Map";
import { ThemedText } from "@/components/ui/ThemedText";
import { colors } from "@/style/colors";
import * as Location from "expo-location";
import { MapPin, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from "react-native";
import { usePublicContext } from "../store/PublicContext";

export default function ReportLocationInput() {
  const { userCoordinates, setUserCoordinates, userAddress, setUserAddress } =
    usePublicContext();
  const [isDetecting, setIsDetecting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!userCoordinates) {
      detectLocation();
    }
  }, []);

  const detectLocation = async () => {
    try {
      setIsDetecting(true);
      setErrorMsg(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsDetecting(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserCoordinates(coords);
      updateAddress(coords);
    } catch (error) {
      console.error("Error detecting location:", error);
      setErrorMsg("Failed to detect location");
    } finally {
      setIsDetecting(false);
    }
  };

  const updateAddress = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      if (Platform.OS === "web") {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
          {
            headers: {
              "Accept-Language": "en",
            },
          }
        );
        const data = await response.json();
        if (data && data.display_name) {
          const parts = data.display_name.split(",");
          const shortAddress = parts.slice(0, 3).join(",").trim();
          setUserAddress(shortAddress || "Unknown Location");
        } else {
          setUserAddress(
            `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`,
          );
        }
      } else {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const reverseGeocode = await Location.reverseGeocodeAsync(coords);
        if (reverseGeocode && reverseGeocode.length > 0) {
          const address = reverseGeocode[0];
          const formattedAddress = [
            address.name,
            address.street,
            address.district,
            address.city,
          ]
            .filter(Boolean)
            .join(", ");
          setUserAddress(formattedAddress || "Unknown Location");
        }
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      setUserAddress(
        `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`,
      );
    }
  };

  const handleRegionChangeComplete = (region: any) => {
    const newCoords = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    setUserCoordinates(newCoords);
    updateAddress(newCoords);
  };

  if (showMap && userCoordinates) {
    return (
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <ThemedText className="text-sm font-bold text-app-text-muted uppercase">
            Select Precise Location
          </ThemedText>
          <TouchableOpacity onPress={() => setShowMap(false)}>
            <X size={20} {...{ color: colors.light.text.secondary }} />
          </TouchableOpacity>
        </View>

        <View className="rounded-xl overflow-hidden border border-app-divider relative">
          <Map
            height={200}
            initialRegion={{
              ...userCoordinates,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onRegionChangeComplete={handleRegionChangeComplete}
          >
            {/* Center Crosshair Overlay */}
            <View
              pointerEvents="none"
              className="absolute inset-0 items-center justify-center"
            >
              <View className="mb-8">
                <MapPin
                  size={32}
                  {...{ color: colors.primary, fill: colors.primary }}
                />
              </View>
            </View>
          </Map>
        </View>
        <ThemedText className="text-xs text-app-text-muted mt-2 text-center">
          Move the map to align the pin with the incident
        </ThemedText>
      </View>
    );
  }

  return (
    <View className="mb-4">
      <ThemedText className="text-sm font-bold text-app-text-muted uppercase mb-2">
        Incident Location
      </ThemedText>

      <View className="p-4 min-h-[60px] bg-app-background rounded-xl flex-row items-center border border-app-background-tertiary">
        {isDetecting ? (
          <View className="flex-1 flex-row items-center justify-center gap-2">
            <ActivityIndicator
              size="small"
              {...{ color: colors.light.text.muted }}
            />
            <Text className="text-app-text-muted text-sm italic font-toyota">
              Detecting your current location...
            </Text>
          </View>
        ) : userCoordinates ? (
          <>
            <View className="mr-3 opacity-70">
              <MapPin size={20} {...{ color: colors.primary }} />
            </View>
            <View className="flex-1">
              <ThemedText className="text-sm font-medium leading-tight">
                {userAddress || "Loading address..."}
              </ThemedText>
              <ThemedText className="text-[10px] text-brand-primary uppercase font-bold mt-1">
                Detected automatically
              </ThemedText>
            </View>
            <TouchableOpacity onPress={() => setShowMap(true)}>
              <ThemedText className="text-brand-primary font-bold text-xs uppercase ml-2">
                Change
              </ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            className="flex-1 items-center"
            onPress={detectLocation}
          >
            <ThemedText className="text-brand-primary font-bold text-sm">
              {errorMsg || "Tap to detect location"}
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
