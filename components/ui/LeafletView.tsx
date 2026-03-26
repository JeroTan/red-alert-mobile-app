import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '@/style/colors';

// Define the events we care about
export enum WebViewLeafletEvents {
  MAP_READY = 'MAP_READY',
  ON_MOVE_END = 'onMoveEnd',
  ON_MOVE = 'onMove',
  ON_MAP_TOUCHED = 'onMapClicked',
  ON_MAP_MARKER_CLICKED = 'onMapMarkerClicked'
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapMarker {
  id?: string;
  position: LatLng;
  icon: string;
  title?: string;
}

export interface LeafletViewProps {
  renderLoading?: () => React.ReactElement;
  onMessageReceived?: (message: any) => void;
  mapMarkers?: MapMarker[];
  mapCenterPosition?: LatLng;
  zoom?: number;
  source: { html: string } | { uri: string } | number;
  doDebug?: boolean;
}

const LeafletView = ({
  renderLoading = () => (
    <View style={styles.loader}>
      <ActivityIndicator color={colors.primary} />
    </View>
  ),
  onMessageReceived,
  mapMarkers,
  mapCenterPosition,
  zoom = 15,
  source,
  doDebug = false
}: LeafletViewProps) => {
  const webViewRef = useRef<WebView>(null);
  const [initialized, setInitialized] = useState(false);

  const logMessage = useCallback((message: string) => {
    if (doDebug) {
      console.log(message);
    }
  }, [doDebug]);

  const sendMessage = useCallback((payload: any) => {
    logMessage(`sending: ${JSON.stringify(payload)}`);
    webViewRef.current?.injectJavaScript(
      `window.postMessage(${JSON.stringify(payload)}, '*');`
    );
  }, [logMessage]);

  const sendInitialMessage = useCallback(() => {
    const startupMessage: any = {
      mapLayers: [{
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        baseLayerIsChecked: true,
        baseLayerName: 'OpenStreetMap.Mapnik',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }],
      zoom
    };

    if (mapMarkers) {
      startupMessage.mapMarkers = mapMarkers;
    }

    if (mapCenterPosition) {
      startupMessage.mapCenterPosition = mapCenterPosition;
    }

    sendMessage(startupMessage);
    setInitialized(true);
    logMessage('sending initial message');
  }, [logMessage, mapCenterPosition, mapMarkers, sendMessage, zoom]);

  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data;
    if (!data) return;

    try {
      const message = JSON.parse(data);
      logMessage(`received: ${JSON.stringify(message)}`);

      // Library specific readiness check (compatible with the provided leaflet.html)
      if (message.msg === 'MAP_READY') {
        sendInitialMessage();
      }

      onMessageReceived?.(message);
    } catch (e) {
      console.error('Error parsing leaflet message', e);
    }
  }, [logMessage, onMessageReceived, sendInitialMessage]);

  // Handle updates after initialization
  useEffect(() => {
    if (!initialized) return;
    sendMessage({ mapMarkers });
  }, [initialized, mapMarkers, sendMessage]);

  useEffect(() => {
    if (!initialized) return;
    sendMessage({ mapCenterPosition });
  }, [initialized, mapCenterPosition, sendMessage]);

  useEffect(() => {
    if (!initialized) return;
    sendMessage({ zoom });
  }, [initialized, zoom, sendMessage]);

  return (
    <WebView
      containerStyle={styles.container}
      ref={webViewRef}
      javaScriptEnabled={true}
      onMessage={handleMessage}
      domStorageEnabled={true}
      startInLoadingState={true}
      originWhitelist={['*']}
      renderLoading={renderLoading}
      source={source as any}
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
      style={styles.webview}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  }
});

export default LeafletView;
