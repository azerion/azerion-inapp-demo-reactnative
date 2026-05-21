import React, { useEffect, useRef, useState } from "react";
import logger from "./Logger";

import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from "@sparkfabrik/react-native-idfa-aaid";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  Image,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import SideMenu from "./components/SideMenu";
import LogViewer from "./components/LogViewer";
import Footer from "./components/Footer";
import DebugLogButton from "./components/DebugLogButton.tsx";

const MenuDrawer = createDrawerNavigator();
const LogDrawer = createDrawerNavigator();

import {
  HomeScreen,
  InterstitialScreen,
  MrecScreen,
  RewardedScreen,
  AdMobWebViewScreen,
  WebViewScreen,
  SettingsScreen,
  BannerScreen,
} from "./screen";

const App: React.FC = () => {
  logger.setDebug(true);

  const [idfa, setIdfa] = useState<string | null>();
  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfoAndCheckAuthorization(true)
      .then((res: AdvertisingInfoResponse) => {
        logger.log("AdvertisingInfoResponse", res);
        !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null);
      })
      .catch((err) => {
        logger.log(err);
        setIdfa(null);
      });

    logger.log("Advertising ID: " + idfa);
  }, []);

  const isDarkMode = useColorScheme() === "dark";

  const panelRef = useRef<{
    openPanel: () => void;
  }>(null);

  const openPanelHandler = () => {
    panelRef.current?.openPanel();
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar backgroundColor={"#7022FF"} />
      <NavigationContainer>
        <MenuDrawer.Navigator
          drawerContent={(props) => <SideMenu {...props} />}
          initialRouteName="Home"
          screenOptions={(navigation) => ({
            drawerStyle: {
              width: 250,  // Set your desired width in pixels
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "#fff",
            },
            headerStyle: {
              backgroundColor: "#000",
              // borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.navigation.toggleDrawer}>
                <Image
                  style={{ height: 20, width: 20, marginLeft: 15 }}
                  source={require("../assets/menu.png")}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <DebugLogButton clickHandler={openPanelHandler} />
            ),
          })}
        >
          <MenuDrawer.Screen name="Home" component={HomeScreen} />
          <MenuDrawer.Screen
            name="Banner"
            component={BannerScreen}
            options={{
              title: "Banner",
              headerRight: () => (
                <DebugLogButton clickHandler={openPanelHandler} />
              ),
            }}
          />
          <MenuDrawer.Screen
            name="Mrec"
            component={MrecScreen}
            options={{
              title: "MREC",
              headerRight: () => (
                <DebugLogButton clickHandler={openPanelHandler} />
              ),
            }}
          />
          <MenuDrawer.Screen
            name="Interstitial"
            component={InterstitialScreen}
            options={{
              title: "Interstitital",
              headerRight: () => (
                <DebugLogButton clickHandler={openPanelHandler} />
              ),
            }}
          />
          <MenuDrawer.Screen
            name="Rewarded"
            component={RewardedScreen}
            options={{
              title: "Rewarded Video",
              headerRight: () => (
                <DebugLogButton clickHandler={openPanelHandler} />
              ),
            }}
          />
          <MenuDrawer.Screen
            name="WebView"
            component={WebViewScreen}
            options={{
              title: "BlueStack WebView",
            }}
          />
          <MenuDrawer.Screen
            name="AdMobWebView"
            component={AdMobWebViewScreen}
            options={{
              title: "AdMob WebView",
            }}
          />
          <MenuDrawer.Screen name="Settings" component={SettingsScreen} />
        </MenuDrawer.Navigator>
      </NavigationContainer>
      <LogViewer ref={panelRef} safeArea={StatusBar.currentHeight} />
      <Footer />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 0,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  headerRightButton: {
    marginLeft: 10,
  },
});

export default App;
