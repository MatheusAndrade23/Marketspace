import { useState } from "react";

import {
  ScrollView,
  VStack,
  Heading,
  Text,
  Image,
  Center,
  useToast,
} from "native-base";

import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Logo from "@assets/logo.png";
import { AppError } from "@utils/AppError";

import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const { singIn } = useAuth();

  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleNewAccount = () => {
    navigation.navigate("signUp");
  };

  const handleSignIn = async ({ email, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await singIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não possível foi entrar. Por favor tente novamente mais tarde.";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
      setIsLoading(false);
    }
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

          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe o e-mail" }}
            render={({ field: { onChange, value } }) => (
              <Input
                w="100%"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Informe a senha" }}
            render={({ field: { onChange, value } }) => (
              <Input
                w="100%"
                secureTextEntry
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Entrar"
            mt={5}
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />

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
