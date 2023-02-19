import { useState, useEffect } from "react";
import { Dimensions, StatusBar } from "react-native";

import {
  ScrollView,
  Text,
  VStack,
  HStack,
  Button as NativeButton,
  Image,
  Heading,
  useTheme,
  useToast,
} from "native-base";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { ArrowLeft, Pencil, Power, Trash } from "phosphor-react-native";

import { ProductDTO } from "../dtos/ProductDTO";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import Carousel from "react-native-reanimated-carousel";

import { GeneratePaymentMethods } from "@utils/generatePaymentMethods";

type RouteParams = {
  id: string;
};

export const MyAd = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({} as ProductDTO);

  const width = Dimensions.get("window").width;

  const { colors } = useTheme();

  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate("app", { screen: "myads" });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await api.get(`products/${id}`);

        console.log(productData.data);

        setProduct(productData.data);
        setIsLoading(false);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : "Não foi possível receber os dados do anúncio. Tente Novamente!";

        if (isAppError) {
          toast.show({
            title,
            placement: "top",
            bgColor: "red.500",
          });
        }
      }
    };

    loadData();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.gray[600]} />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <VStack flex={1}>
            <HStack w="full" justifyContent="space-between" mt={10}>
              <NativeButton variant="secondary" px={5} onPress={handleGoBack}>
                <ArrowLeft color={colors.gray[200]} />
              </NativeButton>

              <NativeButton variant="secondary" px={5}>
                <Pencil color={colors.gray[200]} />
              </NativeButton>
            </HStack>

            <Carousel
              loop
              width={width}
              height={320}
              autoPlay={product.product_images.length > 1}
              data={product.product_images}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <Image
                  w="full"
                  h={80}
                  source={{
                    uri: `${api.defaults.baseURL}/images/${item.path}`,
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
                {product.is_new ? "NOVO" : "USADO"}
              </Heading>
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading color="gray.200" fontSize={22} fontFamily="heading">
                  {product.name}
                </Heading>
                <Text color="blue.light" fontFamily="heading">
                  R${" "}
                  <Heading
                    color="blue.light"
                    fontFamily="heading"
                    fontSize={20}
                  >
                    {product.price}
                  </Heading>
                </Text>
              </HStack>

              <Text mt={2} color="gray.300">
                {product.description}
              </Text>

              <Heading color="gray.300" fontSize={14} my={5}>
                Aceita troca?{" "}
                <Text fontWeight="normal">
                  {product.accept_trade ? "Sim" : "Não"}
                </Text>
              </Heading>

              <Heading color="gray.300" fontSize={14} mb={2}>
                Meios de Pagamento:
              </Heading>

              {GeneratePaymentMethods(
                product.payment_methods.map(
                  (payment_method) => payment_method.key
                )
              )}
            </VStack>

            <VStack px={5} my={5}>
              <Button
                title="Desativar Anúncio"
                icon={<Power size={22} color="white" />}
                mb={2}
              />
              <Button
                title="Excluir Anúncio"
                variant="secondary"
                icon={<Trash size={22} color="white" />}
              />
            </VStack>
          </VStack>
        </ScrollView>
      )}
    </>
  );
};
