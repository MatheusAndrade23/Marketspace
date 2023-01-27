import { useContext } from "react";
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
    <Box flex={1} bg="gray.6">
      <NavigationContainer theme={theme}>
        {true ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
