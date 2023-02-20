import { useState } from "react";

import { useAuth } from "@hooks/useAuth";

import {
  ScrollView,
  Text,
  VStack,
  HStack,
  Image,
  Heading,
  useToast,
} from "native-base";
import { StatusBar, Dimensions } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import { ArrowLeft } from "phosphor-react-native";
import { GeneratePaymentMethods } from "@utils/generatePaymentMethods";

import Carousel from "react-native-reanimated-carousel";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const width = Dimensions.get("window").width;

  const { user } = useAuth();

  const toast = useToast();

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
    navigation.goBack();
  };

  const handlePublish = async () => {
    setIsLoading(true);

    try {
      const product = await api.post("/products", {
        name: title,
        description,
        price: parseInt(price.replace(/[^0-9]/g, "")),
        payment_methods: paymentMethods,
        is_new: isNew,
        accept_trade: acceptTrade,
      });

      const imageData = new FormData();

      images.forEach((item) => {
        const imageFile = {
          ...item,
          name: user.name + "." + item.name,
        } as any;

        imageData.append("images", imageFile);
      });

      imageData.append("product_id", product.data.id);

      const imagesData = await api.post("/products/images", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigation.navigate("myad", {
        id: product.data.id,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não publicar o anúncio. Tente novamente mais tarde!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      setIsLoading(false);
    }
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

          <Carousel
            loop
            width={width}
            height={320}
            autoPlay={images.length > 1}
            data={images}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image
                w="full"
                h={80}
                source={{
                  uri: item.uri
                    ? item.uri
                    : `${api.defaults.baseURL}/images/${item.path}`,
                }}
                alt="Ad Image"
                resizeMode="cover"
                borderColor="gray.400"
                borderWidth={1}
              />
            )}
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
          isLoading={isLoading}
          h={12}
          onPress={handlePublish}
        />
      </HStack>
    </>
  );
};
