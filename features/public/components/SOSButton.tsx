import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface SOSButtonProps {
  onPress: () => void;
}

export function SOSButton({ onPress }: SOSButtonProps) {
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedSOSStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulse.value }],
      opacity: interpolate(pulse.value, [1, 1.1], [1, 0.8]),
    };
  });

  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="items-center justify-center">
        <Animated.View
          style={[
            { width: 220, height: 220, borderRadius: 110 },
            animatedSOSStyle,
          ]}
          className="absolute bg-emergency-critical/20"
        />
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          className="w-52 h-52 bg-emergency-critical rounded-full justify-center items-center shadow-2xl"
        >
          <View className="items-center">
            <Text className="text-white text-2xl font-black text-center leading-tight">
              TAP TO{"\n"}REPORT
            </Text>
            <Text className="text-white text-sm font-bold mt-1 opacity-90 uppercase tracking-widest">
              Emergency
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text className="mt-12 text-gray-400 font-medium text-center px-8">
        Recent: No active emergencies
      </Text>
    </View>
  );
}
