import {
  ScrollView,
  Text,
  VStack,
  HStack,
  Image,
  Heading,
  useTheme,
} from "native-base";
import { StatusBar } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import { ArrowLeft } from "phosphor-react-native";
import { GeneratePaymentMethods } from "@utils/generatePaymentMethods";

type RouteParams = {
  title: string;
  description: string;
  price: string;
  images: any[];
  paymentMethods: string[];
  isNew: boolean;
  acceptTrade: boolean;
};

export const AdPreview = () => {
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const {
    title,
    description,
    price,
    images,
    paymentMethods,
    isNew,
    acceptTrade,
  } = route.params as RouteParams;

  const handleGoBack = () => {
    navigation.navigate("createad");
  };

  return (
    <>
      <StatusBar backgroundColor="#647AC7" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1}>
          <VStack
            w="full"
            justifyContent="space-between"
            pt={12}
            pb={5}
            alignItems="center"
            bg="blue.light"
          >
            <Heading color="white" fontFamily="heading" fontSize={20}>
              Pré visualização do anúncio
            </Heading>
            <Text color="white" fontSize={14}>
              É assim que seu produto vai aparecer!
            </Text>
          </VStack>

          <Image
            w="full"
            h={80}
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
              {isNew ? "Novo" : "Usado"}
            </Heading>
            <HStack w="full" justifyContent="space-between" alignItems="center">
              <Heading color="gray.200" fontSize={22} fontFamily="heading">
                {title}
              </Heading>
              <Text color="blue.light" fontFamily="heading">
                R${" "}
                <Heading color="blue.light" fontFamily="heading" fontSize={20}>
                  {price}
                </Heading>
              </Text>
            </HStack>

            <Text mt={2} color="gray.300">
              {description}
            </Text>

            <Heading color="gray.300" fontSize={14} my={5}>
              Aceita troca?{" "}
              <Text fontWeight="normal">{acceptTrade ? "Sim" : "Não"}</Text>
            </Heading>

            <Heading color="gray.300" fontSize={14} mb={2}>
              Meios de Pagamento:
            </Heading>

            {GeneratePaymentMethods(paymentMethods)}
          </VStack>
        </VStack>
      </ScrollView>
      <HStack
        w="full"
        py={2}
        px={5}
        bg="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="secondary"
          title="Voltar e Editar"
          alignItems="center"
          justifyContent="center"
          w="47%"
          h={12}
          icon={<ArrowLeft color="white" />}
          onPress={handleGoBack}
        />
        <Button
          title="Publicar"
          alignItems="center"
          justifyContent="center"
          w="47%"
          h={12}
        />
      </HStack>
    </>
  );
};
