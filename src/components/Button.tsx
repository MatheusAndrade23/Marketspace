import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "default" | "secondary";
};

export const Button = ({ title, variant = "default", ...rest }: Props) => {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      bg={variant === "secondary" ? "gray.300" : "blue.light"}
      rounded="sm"
      _pressed={{
        bg: variant === "secondary" ? "gray.200" : "blue.default",
      }}
      {...rest}
    >
      <Text
        color={variant === "secondary" ? "gray.600" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
};
