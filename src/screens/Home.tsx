import { useState } from "react";
import {
  HStack,
  ScrollView,
  VStack,
  Image,
  Heading,
  Text,
  Input,
  Modal,
  Button as NativeButton,
  Checkbox,
  Switch,
  Radio,
} from "native-base";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import {
  Plus,
  BookmarkSimple,
  ArrowRight,
  MagnifyingGlass,
  Sliders,
} from "phosphor-react-native";

export const Home = () => {
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);
  const [productCondition, setProductCondition] = useState<string>("new");
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [acceptSwap, setAcceptSwap] = useState<boolean>(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleCreateAd = () => {
    navigation.navigate("createad");
  };

  const handleSeeMyAds = () => {
    navigation.navigate("app", { screen: "myads" });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} p={5}>
        <HStack w="full" mt={12} alignItems="center">
          <Image
            h="12"
            w="12"
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
            alt="Foto de perfil"
            borderRadius="full"
            borderWidth={2}
            borderColor="blue.light"
          />

          <VStack ml="3">
            <Text color="gray.300" fontSize={16}>
              Boas Vindas,
            </Text>
            <Heading color="gray.200" fontSize={18}>
              Matheus
            </Heading>
          </VStack>

          <Button
            title="Novo Anúncio"
            icon={<Plus color="white" />}
            variant="secondary"
            width="40"
            h="12"
            position="absolute"
            right={0}
            onPress={handleCreateAd}
          />
        </HStack>

        <Text color="gray.300" fontSize={16} mt="7">
          Seus produtos anunciados para venda
        </Text>

        <TouchableOpacity onPress={handleSeeMyAds}>
          <HStack
            alignItems="center"
            w="full"
            bg="gray.500"
            h="20"
            p="5"
            borderRadius="8"
            mt="2"
          >
            <BookmarkSimple color="#647AC7" weight="bold" size={28} />

            <VStack ml="5">
              <Heading color="gray.200" fontSize="xl">
                4
              </Heading>
              <Text color="gray.300" fontSize={16} mt={-2}>
                anúncios ativos
              </Text>
            </VStack>

            <HStack position="absolute" right={5}>
              <Heading color="#647AC7" mr="2" fontSize={14}>
                Meus anúncios
              </Heading>
              <ArrowRight color="#647AC7" size="20" weight="bold" />
            </HStack>
          </HStack>
        </TouchableOpacity>

        <Text color="gray.300" fontSize={16} mt="7">
          Compre produtos variados
        </Text>

        <HStack
          w="full"
          alignItems="center"
          mt="2"
          bg="white"
          borderRadius={8}
          pr="1"
        >
          <Input
            placeholder="Buscar anúncio"
            minH={14}
            px={4}
            borderWidth={0}
            borderRadius={8}
            fontSize="md"
            color="gray.200"
            fontFamily="body"
            placeholderTextColor="gray.400"
            bg="white"
            width="50%"
            flex={1}
            _focus={{
              bg: "white",
            }}
          />

          <NativeButton
            bg="white"
            _pressed={{
              bg: "gray.500",
            }}
          >
            <MagnifyingGlass weight="bold" color="#5F5B62" />
          </NativeButton>
          <NativeButton
            onPress={() => setShowFiltersModal(true)}
            bg="white"
            _pressed={{
              bg: "gray.500",
            }}
          >
            <Sliders weight="bold" color="#5F5B62" />
          </NativeButton>
        </HStack>
      </VStack>
      <Modal
        isOpen={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        size="xl"
      >
        <Modal.Content marginBottom="5" marginTop="auto">
          <Modal.CloseButton />
          <Modal.Header>
            <Heading color="gray.200" fontSize={20}>
              Filtar Anúncios
            </Heading>
          </Modal.Header>

          <Modal.Body alignItems="flex-start" mb="5">
            <Heading color="gray.200" fontSize={16} my={2}>
              Condição
            </Heading>

            <Radio.Group
              name="productCondition"
              value={productCondition}
              onChange={(nextValue) => {
                setProductCondition(nextValue);
              }}
            >
              <HStack>
                <Radio value="new" my="2" size="sm">
                  <Text color="gray.200" fontSize={14}>
                    Novo
                  </Text>
                </Radio>
                <Radio value="used" my="2" ml={5} size="sm">
                  <Text color="gray.200" fontSize={14}>
                    Usado
                  </Text>
                </Radio>
              </HStack>
            </Radio.Group>

            <Heading color="gray.200" fontSize={16} my={2}>
              Aceita troca?
            </Heading>

            <Switch
              onToggle={(value) => setAcceptSwap(value)}
              value={acceptSwap}
              size="lg"
              m={0}
            />

            <Heading color="gray.200" fontSize={16} my={2}>
              Meios de pagamento
            </Heading>

            <Checkbox.Group onChange={setPaymentMethods} value={paymentMethods}>
              <Checkbox value="boleto">
                <Text color="gray.300" fontSize={16}>
                  Boleto
                </Text>
              </Checkbox>
              <Checkbox value="pix">
                <Text color="gray.300" fontSize={16}>
                  Pix
                </Text>
              </Checkbox>
              <Checkbox value="dinheiro">
                <Text color="gray.300" fontSize={16}>
                  Dinheiro
                </Text>
              </Checkbox>
              <Checkbox value="credito">
                <Text color="gray.300" fontSize={16}>
                  Cartão de Crédito
                </Text>
              </Checkbox>
              <Checkbox value="deposito">
                <Text color="gray.300" fontSize={16}>
                  Depósito Bancário
                </Text>
              </Checkbox>
            </Checkbox.Group>
          </Modal.Body>

          <Modal.Footer>
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
                title="Resetar Filtros"
                alignItems="center"
                justifyContent="center"
                w="47%"
                h={12}
              />
              <Button
                title="Aplicar Filtros"
                alignItems="center"
                justifyContent="center"
                w="47%"
                h={12}
              />
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};
