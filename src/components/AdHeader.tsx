import {
  HStack,
  IStackProps,
  Heading,
  Button as NativeButton,
  useTheme,
} from "native-base";

import { ArrowLeft } from "phosphor-react-native";

type Props = IStackProps & {
  title: string;
  goBack: () => void;
};

export const AdHeader = ({ title, goBack, ...rest }: Props) => {
  const { colors } = useTheme();

  return (
    <HStack {...rest} w="full" justifyContent="center" alignItems="center">
      <NativeButton
        variant="secondary"
        px={5}
        position="absolute"
        left={0}
        onPress={goBack}
      >
        <ArrowLeft color={colors.gray[200]} />
      </NativeButton>
      <Heading color={colors.gray[200]}>{title}</Heading>
    </HStack>
  );
};
