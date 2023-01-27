import { VStack, IStackProps, Image, Text, Heading } from "native-base";

type Props = IStackProps & {
  title: string;
  price: string;
  used: boolean;
  active: boolean;
  image: string;
};

export const Ad = ({ title, price, used, active, image, ...rest }: Props) => {
  return (
    <VStack {...rest}>
      <Image source={image} alt={title} />
      <Text color="gray.300" fontSize={18} mt={1}>
        {title}
      </Text>
      <Heading color="gray.100" fontSize={20} mt={1}>
        R$ {price}
      </Heading>
    </VStack>
  );
};
