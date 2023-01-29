import { ScrollView, VStack, Heading, Text, Image, Center } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Logo from "@assets/logo.png";

export const SignIn = () => {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleNewAccount = () => {
    navigation.navigate("signUp");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center flex={1}>
        <VStack alignItems="center" width="full" p={5}>
          <Image source={Logo} alt="Logo" mt={10} />
          <Heading color="gray.200" fontSize={36} fontFamily="heading" mt={5}>
            marketspace
          </Heading>
          <Text color="gray.400">Seu espaço de venda e compra</Text>
          <Text color="gray.300" mt={20} mb={5}>
            Acesse a sua conta
          </Text>
          <Input w="100%" placeholder="E-mail" />
          <Input w="100%" secureTextEntry placeholder="Senha" />
          <Button title="Entrar" mt={5} />

          <Text color="gray.300" mt={40}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar uma conta"
            variant="secondary"
            mt={2}
            onPress={handleNewAccount}
          />
        </VStack>
      </Center>
    </ScrollView>
  );
};
