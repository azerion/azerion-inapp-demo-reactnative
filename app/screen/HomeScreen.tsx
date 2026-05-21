import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { BannerAdView } from "@azerion/bluestack-sdk-react-native";
import config from '../../bsconfig';
import logger from "../Logger";
import AdMenuStyle from "./common/AdMenuStyle";

const HomeScreen: React.FC = () => {
    const appId = Platform.OS === 'ios' ? config.IOS_APP_ID : config.ANDROID_APP_ID;

    return (
        <View style={styles.container}>
            <View style={AdMenuStyle.bannerAd}>
                <BannerAdView
                    type={'mediumRectangle'}
                    shouldLoadWhenReady={true}
                    placementId={'/' + appId + '/mrec'}
                    onAdLoaded={(object: any) => {
                        logger.log('Banner loaded, height: ' + object?.nativeEvent?.size);
                    }}
                    onAdFailedToLoad={(error: any) => {
                        logger.log('Banner failed to load: ' + error?.nativeEvent?.message +
                            ', code: ' + error?.nativeEvent?.code);
                    }}
                    onAdRefreshed={() => {
                        logger.log('Banner refreshed');
                    }}
                    onAdFailedToRefresh={(error: any) => {
                        logger.log('Banner failed to refresh: ' + error?.nativeEvent?.message +
                            ', code: ' + error?.nativeEvent?.code);
                    }}
                    onAdClicked={() => {
                        logger.log('Banner clicked');
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
});

export { HomeScreen };