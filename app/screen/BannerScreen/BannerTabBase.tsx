import { Platform, ScrollView, View } from "react-native";
import AdMenuStyle from "../common/AdMenuStyle.tsx";
import AdButton from "../../components/AdButton.tsx";
import Content, { ContentStyle } from "../../components/Content.tsx";
import {
    AdPreference,
    BannerAdType,
    BannerAdView,
} from "@azerion/bluestack-sdk-react-native/src";
import logger from "../../Logger.ts";
import React, { useRef, useState } from "react";
import config from "../../../bsconfig";

interface BannerTabBaseProps {
    bannerAdType: BannerAdType;
}

export const BannerTabBase: React.FC<BannerTabBaseProps> = ({
    bannerAdType: initialBannerAdType,
}) => {
    const appId =
        Platform.OS === "ios" ? config.IOS_APP_ID : config.ANDROID_APP_ID;

    const [bannerAdType, setBannerAdType] =
        useState<BannerAdType>(initialBannerAdType);
    const [placementId, setPlacementId] = useState<string>(
        "/" + appId + "/banner"
    );
    const [isShowingAd, setIsShowingAd] = useState<boolean>(false);

    const bannerInstance = useRef<BannerAdView | null>(null);
    const refreshEnabled = useRef<boolean>(false);

    const loadAd = (adType: BannerAdType, placement: string) => {
        setBannerAdType(adType);
        setPlacementId(placement);

        const preference = new AdPreference();
        preference.setAge(30);
        preference.setGender("Female");
        preference.setLocation(
            {
                latitude: 52.2781724,
                longitude: 4.7506529,
                provider: "network",
            },
            1
        );
        preference.setLanguage("en");
        preference.setContentUrl("https://improvedigital.com");
        preference.setKeyword("brand=myBrand;category=sport");

        bannerInstance.current?.load(preference);
    };

    function removeBanner() {
        logger.log("Remove current banner.");
        bannerInstance.current?.destroy();
        setIsShowingAd(false);
    }

    function showBanner(): void {
        if (!bannerInstance.current?.state.visible) {
            logger.log("Show current banner");
            bannerInstance.current?.show();
        }
    }

    function hideBanner(): void {
        if (bannerInstance.current?.state.visible) {
            logger.log("Hide current banner");
            bannerInstance.current?.hide();
        }
    }

    function toggleRefresh() {
        if (refreshEnabled.current) {
            refreshEnabled.current = false;
        } else {
            refreshEnabled.current = true;
        }

        bannerInstance.current?.toggleRefresh(refreshEnabled.current);
        logger.log("Refresh : " + refreshEnabled.current);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={AdMenuStyle.adButtonsContainer}>
                <AdButton
                    title="Load"
                    onPress={() => loadAd('standard', '/' + appId + '/banner')}
                    active={true}
                />
                <AdButton
                    title="Hide"
                    onPress={() => hideBanner()}
                    active={true}
                />
                <AdButton
                    title="Show"
                    onPress={() => showBanner()}
                    active={true}
                />
                <AdButton
                    title="Toggle Refresh"
                    onPress={() => toggleRefresh()}
                    active={true}
                />
                <AdButton
                    title="Remove"
                    onPress={() => removeBanner()}
                    active={true}
                />
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={AdMenuStyle.adContainer}>
                    <Content type={ContentStyle.hero} />
                    <Content type={ContentStyle.left} />
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
                    <Content type={ContentStyle.left} />
                    <Content type={ContentStyle.left} />
                    <Content type={ContentStyle.left} />
                </View>
            </ScrollView>
        </View>
    );
};
