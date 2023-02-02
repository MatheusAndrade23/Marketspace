import { StatusBar } from "react-native";
import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { Loading } from "@components/Loading";

export const Routes = () => {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600];

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.gray[600]}
        translucent
      />

      <Box flex={1} bg="gray.6">
        <NavigationContainer theme={theme}>
          {false ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      </Box>
    </>
  );
};
