import {
  ScrollView,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Center,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { AdCard } from "@components/AdCard";

import { Plus } from "phosphor-react-native";

export const Ads = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoCreateAd = () => {
    navigation.navigate("createad");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} p={5} mt={5}>
        <HStack
          alignItems="center"
          mt={5}
          width="full"
          position="relative"
          justifyContent="center"
        >
          <Heading color="gray.200" fontSize={22} fontFamily="heading">
            Meus Anúncios
          </Heading>

          <Button
            variant="secondary"
            position="absolute"
            right={-14}
            onPress={handleGoCreateAd}
          >
            <Plus />
          </Button>
        </HStack>

        <HStack w="full" justifyContent="space-between" my={10}>
          <Text color="gray.300" fontSize={16}>
            9 anúncios
          </Text>
          <Text>Todos</Text>
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
  );
};
