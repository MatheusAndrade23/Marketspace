import { useState, useCallback } from "react";
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
  useToast,
  Center,
  FlatList,
} from "native-base";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { AdCard } from "@components/AdCard";
import { Loading } from "@components/Loading";

import { Plus } from "phosphor-react-native";

import { ProductDTO } from "@dtos/ProductDTO";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";

export const MyAds = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [adType, setAdType] = useState("all");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();

  const { colors } = useTheme();

  const filter = adType === "active" ? true : false;

  const productsFiltered = products.filter((product) => {
    if (adType === "all") {
      return true;
    }

    return product.is_active === filter;
  });

  const handleGoCreateAd = () => {
    navigation.navigate("createad");
  };

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const productsData = await api.get(`/users/products`);

          setProducts(productsData.data);
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : "Não foi possível receber seus anúncios. Tente Novamente!";

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

      loadData();
    }, [])
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <StatusBar backgroundColor={colors.gray[600]} />
          <VStack mt={5} pt={5}>
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
                {products.length} anúncios
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
          </VStack>

          <FlatList
            flex={1}
            px={5}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={2}
            data={productsFiltered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AdCard
                width="40"
                title={item.name}
                image={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
                active={item.is_active}
                used={!item.is_new}
                price={item.price.toString()}
                id={item.id}
              />
            )}
            ListEmptyComponent={() => (
              <Center flex={1}>
                {adType === "all" && (
                  <Text color="gray.300" textAlign="center">
                    Você ainda não criou nenhum anúncio. {"\n"}
                    Clique em + para criar seu primeiro!
                  </Text>
                )}
                {adType === "active" && (
                  <Text color="gray.300" textAlign="center">
                    Você não tem nenhum produto ativo!
                  </Text>
                )}
                {adType === "inactive" && (
                  <Text color="gray.300" textAlign="center">
                    Você não tem nenhum produto inativo!
                  </Text>
                )}
              </Center>
            )}
          />
        </>
      )}
    </>
  );
};
