import { View, ScrollView, Platform, StyleSheet, TouchableOpacity, Text } from "react-native";
import AdMenuStyle from "../common/AdMenuStyle";
import React, { useEffect, useRef, useState } from "react";
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { FullTab } from "./FullTab.tsx";
import { LargeTab } from "./LargeTab.tsx";
import { LeaderboardTab } from "./LeaderboardTab.tsx";
import { BannerTab } from "./BannerTab.tsx";
import { DynamicLeaderboardTab } from "./DynamicLeaderboardTab.tsx";
import { DynamicBannerTab } from "./DynamicBannerTab.tsx";

const Tab = createMaterialTopTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: MaterialTopTabBarProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    setCanScrollLeft(contentOffset.x > 0);
    setCanScrollRight(contentOffset.x < contentSize.width - layoutMeasurement.width - 1);
  };

  const scrollLeft = () => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: true });
  };

  const scrollRight = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.tabBarContainer}>
      {canScrollLeft && (
        <TouchableOpacity style={styles.arrowButton} onPress={scrollLeft}>
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
      )}

      {/* @ts-ignore - ref is valid but types are incomplete */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBarScrollView}
        contentContainerStyle={styles.tabBarContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const rawLabel = options.tabBarLabel ?? options.title ?? route.name;
          const label = typeof rawLabel === 'function'
            ? rawLabel({
                focused: isFocused,
                color: isFocused ? '#ffffff' : '#999999',
                children: route.name,
              })
            : rawLabel;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  isFocused && styles.tabLabelActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {canScrollRight && (
        <TouchableOpacity style={styles.arrowButton} onPress={scrollRight}>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#2d2d2d',
    alignItems: 'center',
    minHeight: 50,
  },
  arrowButton: {
    width: 30,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
  },
  arrowText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  tabBarScrollView: {
    flex: 1,
  },
  tabBarContent: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  tabButtonActive: {
    backgroundColor: '#6B4FFF',
  },
  tabLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '300',
  },
  tabLabelActive: {
    color: '#ffffff',
    fontWeight: '300',
  },
});

const BannerScreen: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => <CustomTabBar {...props} />}
      screenOptions={{
        lazy: true,
      }}
    >
      <Tab.Screen name="Standard" component={BannerTab} />
      <Tab.Screen name="Full" component={FullTab} />
      <Tab.Screen name="Large" component={LargeTab} />
      <Tab.Screen name="Leader" component={LeaderboardTab} />
      {/* <Tab.Screen name="Dynamic" component={DynamicBannerTab} />
      <Tab.Screen name="Dynamic Leaderboard" component={DynamicLeaderboardTab} /> */}
    </Tab.Navigator>
  );
};


export { BannerScreen };
