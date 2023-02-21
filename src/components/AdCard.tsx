import { VStack, IStackProps, Image, Text, Heading, Box } from "native-base";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = IStackProps & {
  title: string;
  price: string;
  used: boolean;
  active: boolean;
  image: string;
  id: string;
  showProfile?: boolean;
  profileImage?: string;
};

export const AdCard = ({
  title,
  price,
  used,
  active = true,
  image,
  profileImage,
  showProfile = false,
  id,
  ...rest
}: Props) => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoMyAd = () => {
    if (showProfile) {
      navigation.navigate("ad", { id });
    } else {
      navigation.navigate("myad", { id });
    }
  };

  return (
    <TouchableOpacity onPress={handleGoMyAd}>
      <VStack position="relative" {...rest}>
        {active && (
          <Heading
            textTransform="uppercase"
            color="white"
            fontSize={10}
            bg={!used ? "blue.light" : "gray.200"}
            position="absolute"
            zIndex={100}
            borderRadius={10}
            py={1}
            px={2}
            right={1}
            top={1}
          >
            {used ? "Usado" : "Novo"}
          </Heading>
        )}

        <Box position="relative" alignItems="center" justifyContent="center">
          {!active && (
            <Heading
              textTransform="uppercase"
              color="white"
              fontSize={10}
              position="absolute"
              zIndex={100}
              bg="gray.300"
              p={1}
              borderRadius={10}
            >
              Anúncio Desativado
            </Heading>
          )}

          {showProfile && (
            <Image
              h={8}
              w={8}
              source={{
                uri: profileImage,
              }}
              alt={title}
              borderRadius="full"
              position="absolute"
              zIndex={100}
              left={1}
              top={1}
              borderWidth={1}
              borderColor="gray.300"
            />
          )}
          <Image
            h="24"
            w="lg"
            source={{
              uri: image,
            }}
            alt={title}
            resizeMode="cover"
            borderRadius={10}
            blurRadius={active ? 0 : 10}
            borderWidth={1}
            borderColor="gray.500"
          />
        </Box>

        <Text color={active ? "gray.200" : "gray.400"} fontSize={14} mt={1}>
          {title}
        </Text>
        <Heading color={active ? "gray.200" : "gray.400"} fontSize={14}>
          R$ {price}
        </Heading>
      </VStack>
    </TouchableOpacity>
  );
};
