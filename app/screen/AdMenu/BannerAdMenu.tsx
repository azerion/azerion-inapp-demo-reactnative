import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import AdMenuStyle from "../common/AdMenuStyle";
import logger from "../../Logger.ts";
import config from '../../../bsconfig.js';

// Import components from BlueStack module
import {
    BannerAdView,
    BannerAdType,
} from "@azerion/bluestack-sdk-react-native";

// For Ad Preference 
import {
    AdPreference,
    ProviderType,
    GenderType,
    LocationType
} from "@azerion/bluestack-sdk-react-native";

import AdButton from '../../components/AdButton.tsx';

const BannerAdMenu: React.FC = () => {

    const appId = Platform.OS === 'ios' ? config.IOS_APP_ID : config.ANDROID_APP_ID;

    const [bannerAdType, setBannerAdType] = useState<BannerAdType>('mediumRectangle');
    const [placementId, setPlacementId] = useState<string>('/' + appId + '/banner');
    const [isShowingAd, setIsShowingAd] = useState<boolean>(false);

    const bannerInstance = useRef<BannerAdView | null>(null);
    const refreshEnabled = useRef<boolean>(false);

    const loadAd = (adType: BannerAdType, placement: string) => {
        setBannerAdType(adType);
        setPlacementId(placement);

        const preference = new AdPreference();
        preference.setAge(30);
        preference.setGender('Female');
        preference.setLocation({
            latitude: 52.2781724,
            longitude: 4.7506529,
            provider: 'network'
        }, 1);
        preference.setLanguage("en");
        preference.setContentUrl("https://improvedigital.com");
        preference.setKeyword("brand=myBrand;category=sport");

        bannerInstance.current?.load(preference);
    };

    function removeBanner() {
        logger.log('Remove current banner.');
        bannerInstance.current?.destroy();
        setIsShowingAd(false);
    }

    function toggleBanner() {
        if (!bannerInstance.current?.state.visible) {
            logger.log('Show current banner');
            bannerInstance.current?.show();
        }
        else {
            logger.log('Hide current banner');
            bannerInstance.current?.hide();
        }
    }

    function toggleRefresh() {
        if (refreshEnabled.current) {
            refreshEnabled.current = false;
        }
        else {
            refreshEnabled.current = true;
        }

        bannerInstance.current?.toggleRefresh(refreshEnabled.current);
        logger.log('Refresh : ' + refreshEnabled.current);
    }

    const renderAdActionButtons = () => {
        if (isShowingAd) {
            return (
                <View>
                    <TouchableOpacity
                        style={AdMenuStyle.actionButton}
                        onPress={removeBanner}
                    >
                        <Text style={AdMenuStyle.actionButtonText}>Remove Banner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AdMenuStyle.actionButton}
                        onPress={toggleBanner}
                    >
                        <Text style={AdMenuStyle.actionButtonText}>Toggle Banner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AdMenuStyle.actionButton}
                        onPress={toggleRefresh}
                    >
                        <Text style={AdMenuStyle.actionButtonText}>Toggle Refresh</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

    return (
      <View>
        <Text style={AdMenuStyle.adTitle}>BANNER AD</Text>
        <View style={AdMenuStyle.adButtonsContainer}>
          <AdButton
            title="Banner"
            onPress={() => loadAd("standard", "/" + appId + "/banner")}
            active={false}
          />
          <AdButton
            title="Dynamic Banner"
            onPress={() => loadAd("dynamic", "/" + appId + "/banner")}
            active={false}
          />
          <AdButton
            title="Large Banner"
            onPress={() => loadAd("large", "/" + appId + "/banner")}
            active={false}
          />
        </View>
        <View style={AdMenuStyle.adButtonsContainer}>
          <AdButton
            title="Full Banner"
            onPress={() => loadAd("full", "/" + appId + "/banner")}
            active={false}
          />
          <AdButton
            title="Leaderboard Banner"
            onPress={() => loadAd("leaderboard", "/" + appId + "/banner")}
            active={false}
          />
          <AdButton
            title="Medium Rectangle"
            onPress={() => loadAd("mediumRectangle", "/" + appId + "/banner")}
            active={false}
          />
        </View>
        <View style={AdMenuStyle.adButtonsContainer}>
          {renderAdActionButtons()}
        </View>
        <View style={AdMenuStyle.bannerAd}>
          <BannerAdView
            type={bannerAdType!}
            shouldLoadWhenReady={true}
            placementId={placementId}
            // preference={refBannerPref.current!}
            onAdLoaded={(object: any) => {
              logger.log("Banner loaded, height: " + object?.nativeEvent?.size);
              setIsShowingAd(true);
            }}
            onAdFailedToLoad={(error: any) => {
              logger.log(
                "Banner failed to load: " +
                  error?.nativeEvent?.message +
                  ", code: " +
                  error?.nativeEvent?.code
              );
              setIsShowingAd(false);
            }}
            onAdRefreshed={() => {
              logger.log("Banner refreshed");
            }}
            onAdFailedToRefresh={(error: any) => {
              logger.log(
                "Banner failed to refresh: " +
                  error?.nativeEvent?.message +
                  ", code: " +
                  error?.nativeEvent?.code
              );
            }}
            onAdClicked={() => {
              logger.log("Banner clicked");
            }}
            ref={bannerInstance}
          />
        </View>
      </View>
    );
};

export default BannerAdMenu;