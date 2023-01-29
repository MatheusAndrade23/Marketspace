import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
} from "native-base";

import { Input } from "@components/Input";
import { AdHeader } from "@components/AdHeader";
import { Button } from "@components/Button";

import { Plus } from "phosphor-react-native";

export const CreateAd = () => {
  const [productCondition, setProductCondition] = useState("new");
  const [paymentMethods, setPaymentMethods] = useState([]);

  const { colors } = useTheme();
  return (
    <>
      <ScrollView>
        <AdHeader title="Criar Anúncio" mt={12} />

        <VStack p={5}>
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

          <Input placeholder="Título" />
          <Input
            placeholder="Descrição"
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
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
        />
        <Button
          title="Avançar"
          alignItems="center"
          justifyContent="center"
          w="47%"
          h={12}
        />
      </HStack>
    </>
  );
};
