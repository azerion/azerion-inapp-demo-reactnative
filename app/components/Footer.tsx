import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import logger from '../Logger';
import config from '../../bsconfig';

// Import components from BlueStack module
import {
    BannerAdView,
    BannerAdType,
} from "@azerion/bluestack-sdk-react-native";

const Footer = () => {
    const appId = Platform.OS === 'ios' ? config.IOS_APP_ID : config.ANDROID_APP_ID;

    return (
        <View style={styles.footer}>
            <BannerAdView
                type={'standard'}
                shouldLoadWhenReady={true}
                placementId={'/' + appId + '/banner'}
                onAdLoaded={(object: any) => {
                    logger.log('Footer Banner loaded, height: ' + object?.nativeEvent?.size);
                }}
                onAdFailedToLoad={(error: any) => {
                    logger.log('Footer Banner failed to load: ' + error?.nativeEvent?.message +
                        ', code: ' + error?.nativeEvent?.code);
                }}
                onAdRefreshed={() => {
                    logger.log('Footer Banner refreshed');
                }}
                onAdFailedToRefresh={(error: any) => {
                    logger.log('Footer Banner failed to refresh: ' + error?.nativeEvent?.message +
                        ', code: ' + error?.nativeEvent?.code);
                }}
                onAdClicked={() => {
                    logger.log('Footer Banner clicked');
                }}
            />
        </View>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    footer: {
        // position: 'absolute',
        bottom: 0, // Stick to the bottom of the screen
        height: 50,
        width: '100%', // Take full width of the screen
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 18,
    }
});

export default Footer;