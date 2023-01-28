import { ReactNode } from "react";
import {
  Button as ButtonNativeBase,
  IButtonProps,
  Text,
  HStack,
} from "native-base";

type Props = IButtonProps & {
  title: string;
  icon?: ReactNode;
  variant?: "default" | "secondary";
};

export const Button = ({
  title,
  variant = "default",
  icon,
  ...rest
}: Props) => {
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
      <HStack alignItems="center">
        {icon}
        <Text
          ml={icon ? 2 : 0}
          color={variant === "secondary" ? "gray.600" : "white"}
          fontFamily="heading"
          fontSize="sm"
        >
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  );
};
