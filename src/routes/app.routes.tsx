import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SecondaryAppRoutes } from "./secondaryApp.routes";

import { MyAd } from "@screens/MyAd";

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

type AppRoutes = {
  myad: undefined;
  app: undefined;
};

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="myad" component={MyAd} />
      <Screen name="app" component={AppRoutes} />
    </Navigator>
  );
};
