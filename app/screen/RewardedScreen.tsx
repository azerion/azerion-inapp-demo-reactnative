import { View, ScrollView, Text, Platform } from "react-native";
import BannerAdMenu from "./AdMenu/BannerAdMenu";
import AdMenuStyle from "./common/AdMenuStyle";
import AdButton from "../components/AdButton.tsx";
import React, { useEffect, useRef, useState } from "react";
import config from "../../bsconfig";
import logger from "../Logger.ts";
import { RewardedAdManager } from "@azerion/bluestack-sdk-react-native/src";
import Content, { ContentStyle } from "../components/Content.tsx";

export const HeaderRight = () => {
  return <View style={AdMenuStyle.headerRightButtons}></View>;
};

const RewardedScreen: React.FC = () => {
  const appId =
    Platform.OS === "ios" ? config.IOS_APP_ID : config.ANDROID_APP_ID;

  const rewardedHasLoaded = useRef<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState(true);

  function loadRewarded() {
    setIsButtonActive(false);

    logger.log("Waiting for RewardedScreen to load..");
    RewardedAdManager.loadAd("/" + appId + "/rewardedVideo");
  }

  function displayRewarded() {
    if (rewardedHasLoaded.current) {
      RewardedAdManager.displayAd();
    } else {
      logger.log("RewardedScreen Ad is not loaded");
    }
  }

  useEffect(() => {
    // Add Reward Event Listener
    RewardedAdManager.addEventListener((event: any) => {
      switch (event.rewardedEvent) {
        case "onAdLoaded":
          rewardedHasLoaded.current = true;
          logger.log("RewardedScreen Ad Loaded");
          break;
        case "onAdDismissed":
          rewardedHasLoaded.current = false;
          logger.log("RewardedScreen Ad Disappeared");
          break;
        case "onAdDisplayed":
          rewardedHasLoaded.current = false;

          logger.log("RewardedScreen Ad Displayed");
          break;
        case "onAdClicked":
          logger.log("RewardedScreen Ad Clicked");
          break;
        case "onRewardEarned":
          logger.log(
            "Reward Earned: Type-" +
              event.rewardType +
              ", Amount-" +
              event.rewardAmount
          );
          break;
        case "onAdFailedError":
          logger.log("RewardedScreen Ad Failed");
          logger.log(event.errorMessage);
          break;
        default:
          break;
      }
      setIsButtonActive(rewardedHasLoaded.current);
    });
  }, []);

  return (
    <View style={AdMenuStyle.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={AdMenuStyle.adContainer}>
          <View style={AdMenuStyle.adButtonsContainer}>
            <AdButton
              title="Load Rewarded Ad"
              onPress={() => loadRewarded()}
              active={true}
            />
            <AdButton
              title="Show Rewarded Ad"
              onPress={() => displayRewarded()}
              active={rewardedHasLoaded.current}
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

export { RewardedScreen };
