import { View, ScrollView, Platform } from "react-native";
import AdMenuStyle from "./common/AdMenuStyle";
import Content, { ContentStyle } from "../components/Content.tsx";
import config from "../../bsconfig";
import React, { useEffect, useRef, useState } from "react";
import logger from "../Logger.ts";
import {
  AdPreference,
  InterstitialAdManager,
  LocationType,
  ProviderType,
} from "@azerion/bluestack-sdk-react-native/src";
import AdButton from "../components/AdButton.tsx";

const InterstitialScreen: React.FC = () => {
  const appId =
    Platform.OS === "ios" ? config.IOS_APP_ID : config.ANDROID_APP_ID;

  const interstitialHasLoaded = useRef<boolean>(false);
  const [loadButtonActive, setLoadButtonActive] = useState(true);
  const [showButtonActive, setShowButtonActive] = useState(false);

  function loadInterstitial() {
    setLoadButtonActive(false);
    setShowButtonActive(false);
    logger.log("Waiting for intertistial to load..");

    const preference = new AdPreference();
    preference.setAge(30);
    preference.setGender("Male");

    let provider: ProviderType = "full";
    let location: LocationType = {
      latitude: 52.2781724,
      longitude: 4.7506529,
      provider: provider,
    };

    preference.setLocation(location, 1);
    preference.setLanguage("en");
    preference.setContentUrl("https://improvedigital.com");
    preference.setKeyword("brand=myBrand;category=sport");

    InterstitialAdManager.loadAd(
      "/" + appId + "/interstitial",
      false,
      preference
    );
    // InterstitialAdManager.loadAd('/' + appId + '/IEX_APP_IOS_INTERSTITIAL', true, preference);
  }

  function displayInterstitial() {
    if (interstitialHasLoaded.current) {
      InterstitialAdManager.displayAd();
    } else {
      logger.log("Interstitial Ad is not loaded");
    }
  }

  useEffect(() => {
    // Interstitial Event Listener
    InterstitialAdManager.addEventListener((event: any) => {
      console.log(event.interstitialEvent);
      switch (event.interstitialEvent) {
        case "onAdLoaded":
          interstitialHasLoaded.current = true;
          setLoadButtonActive(false);
          setShowButtonActive(true);
          logger.log("Interstitial Ad Loaded");
          break;
        case "onAdDismissed":
          interstitialHasLoaded.current = false;
          setLoadButtonActive(true);
          setShowButtonActive(false);
          logger.log("Interstitial Ad Disappeared");
          break;
        case "onAdDisplayed":
          interstitialHasLoaded.current = false;
          setLoadButtonActive(true);
          setShowButtonActive(false);
          logger.log("Interstitial Ad Displayed");
          break;
        case "onAdClicked":
          logger.log("Interstitial Ad Clicked");
          break;
        case "onAdFailedError":
          interstitialHasLoaded.current = false;
          setLoadButtonActive(true);
          setShowButtonActive(false);
          logger.log("Interstitial Ad Failed");
          logger.log(event.errorMessage);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <View style={AdMenuStyle.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={AdMenuStyle.adContainer}>
          <View style={AdMenuStyle.adButtonsContainer}>
            <AdButton
              title="Load Interstitial"
              onPress={() => loadInterstitial()}
              active={loadButtonActive}
            />
            <AdButton
              title="Show Interstitial"
              onPress={() => displayInterstitial()}
              active={showButtonActive}
            />
          </View>
          <Content type={ContentStyle.hero} />
          <Content type={ContentStyle.left} />
          <Content type={ContentStyle.left} />
          <Content type={ContentStyle.left} />
          <Content type={ContentStyle.left} />
        </View>
      </ScrollView>
    </View>
  );
};

export { InterstitialScreen };
