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

import { useForm, Controller } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Logo from "@assets/logo_05x.png";
import Profile from "@assets/profile.png";

import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  phoneNumber: yup.string().required("Informe seu número."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password"), null], "A confirmação da senha não confere."),
});

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async ({ name, email, password }: FormDataProps) => {
    try {
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                w="100%"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
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
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                w="100%"
                placeholder="Telefone"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phoneNumber?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input w="100%" secureTextEntry placeholder="Senha" />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                w="100%"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
                placeholder="Confirmar Senha"
              />
            )}
          />

          <Button
            title="Criar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />

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
