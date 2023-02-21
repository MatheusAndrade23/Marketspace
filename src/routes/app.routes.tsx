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
  ad: {
    id: string;
  };
  myad: {
    id: string;
  };
  editad: {
    title: string;
    description: string;
    price: string;
    images: any[];
    paymentMethods: string[];
    isNew: boolean;
    acceptTrade: boolean;
    id: string;
  };
  createad: undefined;
  adpreview: {
    title: string;
    description: string;
    price: string;
    images: any[];
    paymentMethods: string[];
    isNew: boolean;
    acceptTrade: boolean;
  };
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
