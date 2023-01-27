import { Platform } from "react-native";
import { useTheme } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ads } from "@screens/Ads";
import { Home } from "@screens/Home";

import HomeSvg from "@assets/home.svg";
import AdsSvg from "@assets/ads.svg";
import GetOutSvg from "@assets/getout.svg";

type SecondaryAppRoutes = {
  home: undefined;
  ads: undefined;
  getout: undefined;
  secondary: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<SecondaryAppRoutes>();

export const SecondaryAppRoutes = () => {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="ads"
        component={Ads}
        options={{
          tabBarIcon: ({ color }) => (
            <AdsSvg
              fill={color}
              stroke={color}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="getout"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <GetOutSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
    </Navigator>
  );
};
