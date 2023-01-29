import { ScrollView, VStack, Heading, Text, Image, Center } from "native-base";

import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Logo from "@assets/logo_05x.png";
import Profile from "@assets/profile.png";

export const SignUp = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center flex={1}>
        <VStack alignItems="center" width="full" p={5}>
          <Image source={Logo} alt="Logo" mt={8} />
          <Heading color="gray.200" fontFamily="heading">
            Boas Vindas!
          </Heading>
          <Text color="gray.400" textAlign="center">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>

          <Image source={Profile} alt="Logo" my={5} />

          <Input w="100%" placeholder="Nome" />
          <Input w="100%" placeholder="E-mail" />
          <Input w="100%" placeholder="Telefone" />
          <Input w="100%" secureTextEntry placeholder="Senha" />
          <Input w="100%" secureTextEntry placeholder="Confirmar Senha" />
          <Button title="Criar" />

          <Text color="gray.300" mt={10}>
            Já tem uma conta?
          </Text>
          <Button
            title="Ir para o login"
            variant="secondary"
            mt={2}
            onPress={handleGoBack}
          />
        </VStack>
      </Center>
    </ScrollView>
  );
};
