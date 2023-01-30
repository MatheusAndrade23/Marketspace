import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { SecondaryAppRoutes } from "./secondaryApp.routes";

import { Ad } from "@screens/Ad";
import { MyAd } from "@screens/MyAd";
import { EditAd } from "@screens/EditAd";
import { CreateAd } from "@screens/CreateAd";
import { AdPreview } from "@screens/AdPreview";

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

type AppRoutes = {
  ad: undefined;
  myad: undefined;
  editad: undefined;
  createad: undefined;
  adpreview: undefined;
  app: {
    screen: "myads" | "home" | "getout";
  };
};

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="app">
      <Screen name="ad" component={Ad} />
      <Screen name="myad" component={MyAd} />
      <Screen name="editad" component={EditAd} />
      <Screen name="createad" component={CreateAd} />
      <Screen name="adpreview" component={AdPreview} />
      <Screen name="app" component={SecondaryAppRoutes} />
    </Navigator>
  );
};
