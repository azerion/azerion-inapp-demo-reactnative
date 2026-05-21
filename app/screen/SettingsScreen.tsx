import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Clipboard, TouchableOpacity, Switch, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from "@sparkfabrik/react-native-idfa-aaid";
import logger from "../Logger.ts";
import { AdsConsent, AdsConsentStatus } from "react-native-google-mobile-ads";
import config from '../../bsconfig';

const SettingsScreen: React.FC = () => {
  const [advertisingId, setAdvertisingId] = useState('43908673420957624083670894323498057');
  const [consent, setConsent] = useState('CP20-YAP20-YAAAAAA');
  const [isDebugModeEnabled, setIsDebugModeEnabled] = useState(false);
  const idfaDefault: string = '00000000-0000-0000-0000-000000000000';
  const appId = Platform.OS === 'ios' ? config.IOS_APP_ID : config.ANDROID_APP_ID;
  
  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfoAndCheckAuthorization(true)
      .then((res: AdvertisingInfoResponse) => {
        logger.log("AdvertisingInfoResponse", res);
        !res.isAdTrackingLimited ? setAdvertisingId(res.id || idfaDefault) : setAdvertisingId(idfaDefault);
      })
      .catch((err) => {
        logger.log(err);
        setAdvertisingId(idfaDefault);
      });

    AdsConsent.getTCString().then((consentString: string) => {
      setConsent(consentString);
    })

    logger.log("Advertising ID: " + idfaDefault);
  }, []);

  return (
    <View>
      <LinearGradient
        colors={["#7022FF", "#504DE4", "#0975E0"]}
        style={[styles.topContainer]}
      >
        <View style={styles.tableRow}>
          <Text style={[styles.topText, styles.headText]}>BlueStack ID</Text>
          <Text style={[styles.topText, styles.topValue]}>{appId}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.topText, styles.headText]}>
            Enable Debug Mode
          </Text>
          <Switch
            value={isDebugModeEnabled}
            onValueChange={(value) => setIsDebugModeEnabled(value)}
          />
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <Text style={[styles.bottomText, styles.headText]}>Advertising ID</Text>
        <View style={styles.advertisingId}>
          <Text style={{ width: "80%" }}>{advertisingId}</Text>
          <TouchableOpacity onPress={() => Clipboard.setString(advertisingId)}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/copy.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
        <Text style={[styles.bottomText, styles.headText]}>TCF Consent</Text>
        <View style={styles.advertisingId}>
          <Text style={{ width: "80%" }}>
            {consent.length > 40 ? `${consent.substring(0, 40)}...` : consent}
          </Text>
          <TouchableOpacity onPress={() => Clipboard.setString(consent)}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/copy.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topText: {
    color: "#ffffff"
  },
  headText: {
    fontSize: 20,
    fontWeight: "700",
  },
  topValue: {
    fontSize: 20,
    fontWeight: "400",
  },
  topContainer: {
    height: 200,
    paddingLeft: 20,
    paddingTop: 20
  },
  bottomText: {
    color: "#000"
  },
  bottomContainer: {
    borderRadius: 40,
    top: -50,
    backgroundColor: "#fff",
    height: 500,
    paddingTop: 40,
    paddingLeft: 20
  },
  title: {
    fontSize: 24
  },
  advertisingId: {
    backgroundColor: "#EFEFEF",
    width: "90%",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
  },
  valueText: {
    color: '#000'
  }
});

export { SettingsScreen };
