import {
  ScrollView,
  Text,
  VStack,
  HStack,
  Button as NativeButton,
  Image,
  Heading,
  useTheme,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import {
  ArrowLeft,
  Barcode,
  QrCode,
  Bank,
  Money,
  CreditCard,
  WhatsappLogo,
} from "phosphor-react-native";

export const Ad = () => {
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate("app", { screen: "home" });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1}>
          <HStack w="full" justifyContent="space-between" mt={10}>
            <NativeButton variant="secondary" px={5} onPress={handleGoBack}>
              <ArrowLeft color={colors.gray[200]} />
            </NativeButton>
          </HStack>

          <Image
            w="full"
            h={80}
            mt={2}
            source={{
              uri: "https://img.ltwebstatic.com/gspCenter/goodsImage/2022/8/12/3845434535_1017760/6FD9BA9080E2D0D65BCF7BF88D0DCDA9_thumbnail_600x.jpg",
            }}
            alt="Ad Image"
            resizeMode="cover"
            borderColor="gray.400"
            borderWidth={1}
          />

          <VStack px={5}>
            <Heading
              my={2}
              textTransform="uppercase"
              color="blue.default"
              fontSize={14}
              mt={4}
            >
              Usado
            </Heading>
            <HStack w="full" justifyContent="space-between" alignItems="center">
              <Heading color="gray.200" fontSize={22} fontFamily="heading">
                Luminária pendente
              </Heading>
              <Text color="blue.light" fontFamily="heading">
                R${" "}
                <Heading color="blue.light" fontFamily="heading" fontSize={20}>
                  45,00
                </Heading>
              </Text>
            </HStack>

            <Text mt={2} color="gray.300">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus.{" "}
            </Text>

            <Heading color="gray.300" fontSize={14} my={5}>
              Aceita troca? <Text fontWeight="normal">Não</Text>
            </Heading>

            <Heading color="gray.300" fontSize={14} mb={2}>
              Meios de Pagamento:
            </Heading>

            <HStack alignItems="center">
              <Barcode size={20} color={colors.gray[300]} />
              <Text ml={2} color="gray.300">
                Boleto
              </Text>
            </HStack>

            <HStack alignItems="center">
              <QrCode size={20} color={colors.gray[300]} />
              <Text ml={2} color="gray.300">
                Pix
              </Text>
            </HStack>

            <HStack alignItems="center">
              <Bank size={20} color={colors.gray[300]} />
              <Text ml={2} color="gray.300">
                Depósito Bancário
              </Text>
            </HStack>

            <HStack alignItems="center">
              <Money size={20} color={colors.gray[300]} />
              <Text ml={2} color="gray.300">
                Dinheiro
              </Text>
            </HStack>

            <HStack alignItems="center">
              <CreditCard size={20} color={colors.gray[300]} />
              <Text ml={2} color="gray.300">
                Cartão de Crédito
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
      <HStack
        w="full"
        p={5}
        bg="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="blue.light" fontFamily="heading">
          R${" "}
          <Heading color="blue.light" fontFamily="heading" fontSize={24}>
            45,00
          </Heading>
        </Text>

        <Button
          title="Entrar em contato"
          icon={<WhatsappLogo color="white" weight="fill" size={20} />}
          alignItems="center"
          justifyContent="center"
          w="50%"
        />
      </HStack>
    </>
  );
};
