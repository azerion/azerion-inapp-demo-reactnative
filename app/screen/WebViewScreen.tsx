import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeEventSubscription } from 'react-native/Libraries/EventEmitter/RCTNativeAppEventEmitter';

const WebViewScreen: React.FC = () => {

    const goBack = () => {
        webViewRef.current!.goBack();
    };

    const goForward = () => {
        webViewRef.current!.goForward();
    };

    const webViewRef = useRef<WebView | null>(null);
    const onAndroidBackPress = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack();
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            const bh:NativeEventSubscription = BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
            return () => {
                bh.remove();
            };
        }
    }, []);

    // Placeholder values for the WebView ad bridge demo. Replace with real
    // values from your app at runtime (e.g. via `react-native-idfa-aaid` for
    // the advertising id, the user's actual TCF consent string, etc.).
    const bsConfigJS = `
        window.isNativeApp = true;

        const PrivacyRegulations = {
            GDPR: 'GDPR',
            CCPA: 'CCPA'
        };

        const BlueStackConfig = {
            bundleId: "com.azerion.ads.testapp",
            policy: PrivacyRegulations.GDPR,
            consentString: "",
            userAgent: "",
            advertisingId: "00000000-0000-0000-0000-000000000000"
        };

        window.azOwm = BlueStackConfig;

        true;
     `;

    return (
        <>
            <View style={styles.controlPanel}>
                <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}>
                    <Text style={styles.closeButtonText}>⇦</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={() => goForward()}>
                    <Text style={styles.clearButtonText}>⇨</Text>
                </TouchableOpacity>
            </View>
            <WebView
                source={{ uri: 'https://example.com/' }}
                thirdPartyCookiesEnabled={false}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={true}
                injectedJavaScriptBeforeContentLoaded={bsConfigJS}
                // injectedJavaScript={runFirst}
                // onMessage={(event) => { }}
                // incognito={true}
                // cacheEnabled={false}
                // cacheMode={'LOAD_NO_CACHE'}
                ref={webViewRef}
            />
        </>
    );
};

const styles = StyleSheet.create({
    controlPanel: {
        backgroundColor: '#333',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    title: {
        fontSize: 24,
    },
    closeButton: {
        backgroundColor: '#000',
        position: 'absolute',
        left: 10,
        zIndex: 1001,
    },
    closeButtonText: {
        top: -10,
        fontSize: 40,
        color: '#fff',
    },
    clearButton: {
        backgroundColor: '#000',
        position: 'absolute',
        right: 10,
        zIndex: 1001,
    },
    clearButtonText: {
        top: -10,
        fontSize: 40,
        color: '#fff',
    },
});

export { WebViewScreen };