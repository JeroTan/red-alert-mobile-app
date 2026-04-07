import { Alert, Platform } from "react-native";

const alertPolyfill: typeof Alert.alert = (
  title,
  message,
  buttons,
  _options,
) => {
  const text = [title, message].filter(Boolean).join("\n");

  if (!buttons || buttons.length === 0) {
    window.alert(text);
    return;
  }

  if (buttons.length === 1) {
    window.alert(text);
    buttons[0]?.onPress?.();
    return;
  }

  const cancelButton = buttons.find((b) => b.style === "cancel");
  const confirmButton = buttons.find((b) => b.style !== "cancel");

  const confirmed = window.confirm(text);

  if (confirmed) {
    confirmButton?.onPress?.();
  } else {
    cancelButton?.onPress?.();
  }
};

const AlertUniversal = Platform.OS === "web" ? alertPolyfill : Alert.alert;

export default AlertUniversal;
