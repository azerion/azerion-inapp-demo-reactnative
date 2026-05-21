import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface SideMenuProps {
  navigation: any;
}

const SideMenu: React.FC<SideMenuProps> = ({ navigation }) => {
  return (
    <View style={styles.sideMenuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View style={styles.sideMenuHeader}>
          <Image
            resizeMode="contain"
            source={require("../../assets/bluestack-logo-black.png")}
            style={styles.logo}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.sideMenu}>
        <TouchableOpacity onPress={() => navigation.navigate("Banner")}>
          <View style={styles.adItem}>
            <Image
              source={require("../../assets/banner.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>Banner</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Mrec")}>
          <View style={styles.adItem}>
            <Image
              source={require("../../assets/mrec.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>MREC</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Interstitial")}>
          <View style={styles.adItem}>
            <Image
              source={require("../../assets/interstitial.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>Interstitial</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Rewarded")}>
          <View style={styles.adItem}>
            <Image
              source={require("../../assets/rewarded.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>Rewarded Video</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => ''}>
          <View style={styles.adItem}>
            <Image
              source={require('../../assets/native.png')}
              style={styles.icon}
            />
            <Text style={styles.text}>Native</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate("WebView")}>
          <View style={styles.adItem}>
            <Image
              source={require("../../assets/bluestack.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>BlueStack WebView Ad</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AdMobWebView")}>
          <View style={styles.adItem}>
            <Image
              source={require("../../assets/google.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>AdMob WebView Ad</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <View style={styles.adItem}>
            <Image
              source={require("../../assets/settings.png")}
              style={styles.icon}
            />
            <Text style={styles.text}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    backgroundColor: "#000",
    width: 250,
  },
  logo: {
    width: Dimensions.get("window").width / 2,
  },
  sideMenuHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  adItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: "cover",
    marginRight: 10,
  },
  sideMenu: {
    // padding: 20,
  },
});

export default SideMenu;
