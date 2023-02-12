import { useState } from "react";

import { TouchableOpacity } from "react-native";

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

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useNavigation } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import Logo from "@assets/logo_05x.png";
import Profile from "@assets/profile.png";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import { useAuth } from "@hooks/useAuth";

type userImageSelectedProps = {
  selected: boolean;
  photo: {
    uri: string;
    name: string;
    type: string;
  };
};

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
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
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
  const [userImageSelected, setUserImageSelected] = useState({
    selected: false,
  } as userImageSelectedProps);

  const navigation = useNavigation();

  const toast = useToast();

  const { singIn } = useAuth();

  const {
    control,
    handleSubmit,
    getValues,
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

  const userForm = new FormData();

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setUserImageSelected({
          selected: true,
          photo: { ...photoFile },
        });

        toast.show({
          title: "Foto selecionada!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      toast.show({
        title: "Erro! Tente novamente mais tarde!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async ({
    name,
    email,
    password,
    phoneNumber,
  }: FormDataProps) => {
    try {
      if (!userImageSelected.selected) {
        return toast.show({
          title: "Por favor selecione uma imagem!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      const { name } = getValues();

      const userImage = {
        ...userImageSelected.photo,
        name: `${name}.${userImageSelected.photo.name}`.toLowerCase(),
      };

      userForm.append("avatar", userImage);
      userForm.append("name", name.toLowerCase());
      userForm.append("email", email.toLowerCase());
      userForm.append("tel", phoneNumber);
      userForm.append("password", password);

      setIsLoading(true);

      await api.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await singIn(email, password);
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
    } finally {
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
          <Image source={Logo} alt="Logo" mt={8} />
          <Heading color="gray.200" fontFamily="heading">
            Boas Vindas!
          </Heading>
          <Text color="gray.400" textAlign="center" mb={5}>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            {userImageSelected.selected ? (
              <Image
                w="20"
                h="20"
                borderRadius="full"
                borderWidth="2"
                borderColor="blue.light"
                source={{
                  uri: userImageSelected.photo.uri,
                }}
                alt="User Image"
              />
            ) : (
              <Image source={Profile} alt="User Image" />
            )}
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                mt={5}
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
            name="phoneNumber"
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
