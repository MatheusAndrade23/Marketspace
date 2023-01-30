import { useState } from "react";
import { StatusBar } from "react-native";

import {
  ScrollView,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Select,
  useTheme,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { AdCard } from "@components/AdCard";

import { Plus } from "phosphor-react-native";

export const MyAds = () => {
  const [adType, setAdType] = useState("all");
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { colors } = useTheme();

  const handleGoCreateAd = () => {
    navigation.navigate("createad");
  };

  return (
    <>
      <StatusBar backgroundColor={colors.gray[600]} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1} mt={5} py={5}>
          <HStack
            alignItems="center"
            mt={5}
            width="full"
            position="relative"
            justifyContent="center"
            px={5}
          >
            <Heading color="gray.200" fontSize={22} fontFamily="heading">
              Meus Anúncios
            </Heading>

            <Button
              variant="secondary"
              position="absolute"
              right={0}
              pr={5}
              onPress={handleGoCreateAd}
            >
              <Plus />
            </Button>
          </HStack>

          <HStack
            w="full"
            justifyContent="space-between"
            my={7}
            alignItems="center"
            px={5}
          >
            <Text color="gray.300" fontSize={16}>
              9 anúncios
            </Text>
            <Select
              selectedValue={adType}
              placeholder="Escolha um tipo"
              minWidth="110"
              color="gray.300"
              onValueChange={(itemValue) => setAdType(itemValue)}
              _selectedItem={{
                borderColor: "blue.light",
                borderWidth: 1,
                borderRadius: 8,
              }}
            >
              <Select.Item label="Todos" value="all" />
              <Select.Item label="Ativos" value="active" />
              <Select.Item label="Inativos" value="inactive" />
            </Select>
          </HStack>

          <AdCard
            title="Luminária pendente"
            image="https://m.media-amazon.com/images/I/510SeRtQxzL._AC_SX679_.jpg"
            active={true}
            used={false}
            price="45,00"
          />
          <AdCard
            title="Luminária pendente"
            image="https://m.media-amazon.com/images/I/510SeRtQxzL._AC_SX679_.jpg"
            active={false}
            used={true}
            price="45,00"
          />
        </VStack>
      </ScrollView>
    </>
  );
};
