import { Session } from "@/domain/auth/entity/Session";
import { SessionRepository } from "@/domain/auth/repository/SessionRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export class SessionRepositoryApi implements SessionRepository {
  async clearSession(): Promise<void> {}
  async hasSession(): Promise<boolean> {
    try {
      if (Platform.OS === "web") {
        const session = await AsyncStorage.getItem("session");
        return !!session;
      } else {
        const session = await SecureStore.getItemAsync("session");
        return !!session;
      }
    } catch (error) {
      console.error("Error checking session:", error);
      return false;
    }
  }
  async getSession(): Promise<Session> {
    let sessionResult: string | null = null;
    if (Platform.OS === "web") {
      sessionResult = await AsyncStorage.getItem("session");
    } else {
      sessionResult = await SecureStore.getItemAsync("session");
    }
    if (!sessionResult) {
      throw new Error("No session found.");
    }
    const sessionObj = JSON.parse(sessionResult);
    return sessionObj as Session;
  }
  async storeSession(session: Session): Promise<void> {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem("session", JSON.stringify(session));
    } else {
      await SecureStore.setItemAsync("session", JSON.stringify(session));
    }
  }
}
