import { useState } from "react";
import { LogBox } from "react-native";

import {
  ScrollView,
  VStack,
  Heading,
  Text,
  HStack,
  Image,
  Button as NativeButton,
  useTheme,
  Radio,
  Checkbox,
  Switch,
} from "native-base";

import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AdHeader } from "@components/AdHeader";

import { Plus } from "phosphor-react-native";

const editAdSchema = yup.object({
  title: yup
    .string()
    .required("Informe um título.")
    .min(6, "O título deve ter no mínimo 6 letras."),
  description: yup
    .string()
    .required("Informe uma descrição.")
    .min(20, "A descrição deve ser detalhada!"),
  price: yup.string().required("Informe um preço."),
});

type FormDataProps = {
  title: string;
  description: string;
  price: string;
};

export const EditAd = () => {
  const [productCondition, setProductCondition] = useState<string>("new");
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [acceptSwap, setAcceptSwap] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
    resolver: yupResolver(editAdSchema),
  });

  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate("myad");
  };

  const handleGoPreview = () => {
    navigation.navigate("adpreview");
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <AdHeader title="Editar Anúncio" mt={12} goBack={handleGoBack} />

        <VStack p={5} flex={1} alignItems="flex-start">
          <Heading color="gray.200" fontSize={18}>
            Imagens
          </Heading>
          <Text color="gray.300" fontSize={14}>
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <HStack my={5}>
            <Image
              w={88}
              h={88}
              source={{
                uri: "https://img.ltwebstatic.com/gspCenter/goodsImage/2022/8/12/3845434535_1017760/6FD9BA9080E2D0D65BCF7BF88D0DCDA9_thumbnail_600x.jpg",
              }}
              alt="Imagem do novo anúncio"
              resizeMode="cover"
              borderRadius={8}
            />

            <NativeButton
              bg="gray.500"
              w={88}
              h={88}
              ml={2}
              _pressed={{
                borderWidth: 1,
                bg: "gray.500",
                borderColor: "gray.400",
              }}
            >
              <Plus color={colors.gray[400]} />
            </NativeButton>
          </HStack>

          <Heading color="gray.200" fontSize={18} my={2}>
            Sobre o produto
          </Heading>

          <Controller
            control={control}
            name="title"
            rules={{ required: "Informe o título" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            rules={{ required: "Informe a descrição" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Descrição"
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description?.message}
              />
            )}
          />

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
                  Produto novo
                </Text>
              </Radio>
              <Radio value="used" my="2" ml={5} size="sm">
                <Text color="gray.200" fontSize={14}>
                  Produto usado
                </Text>
              </Radio>
            </HStack>
          </Radio.Group>

          <Heading color="gray.200" fontSize={16} mb={2} mt={5}>
            Venda
          </Heading>

          <Input placeholder="0,00" h="14" mb={0} />

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
          title="Cancelar"
          alignItems="center"
          justifyContent="center"
          w="47%"
          h={12}
          onPress={handleGoBack}
        />
        <Button
          title="Avançar"
          alignItems="center"
          justifyContent="center"
          w="47%"
          h={12}
          onPress={handleSubmit(handleGoPreview)}
        />
      </HStack>
    </>
  );
};

// Procurando solução
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);
