import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeEventSubscription } from 'react-native/Libraries/EventEmitter/RCTNativeAppEventEmitter';

const AdMobWebViewScreen: React.FC = () => {

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
            const bh: NativeEventSubscription = BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
            return () => {
                bh.remove();
            };
        }
    }, []);

    const inlineHTML = `
      <body style="display:flex; flex-direction: column;justify-content: center; 
        align-items:center; background-color: black; color:white; height: 100%;">
          <h1 style="font-size:100px; padding: 50px; text-align: center;" id="h1_element">
            inline html
          </h1>
          <h2 style="display: block; font-size:80px; padding: 50px; text-align: center;" id="h2_element">
            Ad placement
          </h2>
       </body>`;

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
                source={{ uri: 'https://webview-api-for-ads-test.glitch.me/#api-for-ads-tests' }}
                thirdPartyCookiesEnabled={true}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                mediaPlaybackRequiresUserAction={false}
                ref={webViewRef}
            />

            {/* <WebView source={{ html: inlineHTML }} /> */}
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

export { AdMobWebViewScreen };